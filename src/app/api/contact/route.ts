import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Email service integrations
import { sendWithResend } from '@/lib/email/resend';
import { sendWithNodemailer } from '@/lib/email/nodemailer';
import { sendWithFormspree } from '@/lib/email/formspree';

// Validation schema
const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Please enter a valid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
    message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Rate limiting (simple in-memory store for demo - use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 submissions per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const userLimit = rateLimitStore.get(ip);

    if (!userLimit || now > userLimit.resetTime) {
        rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (userLimit.count >= RATE_LIMIT) {
        return false;
    }

    userLimit.count++;
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            '127.0.0.1';

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Too many submissions. Please try again later.',
                    code: 'RATE_LIMIT_EXCEEDED'
                },
                { status: 429 }
            );
        }

        // Parse and validate request body
        const body = await request.json();

        const validationResult = contactFormSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid form data',
                    details: validationResult.error.issues,
                    code: 'VALIDATION_ERROR'
                },
                { status: 400 }
            );
        }

        const formData: ContactFormData = validationResult.data;

        // Sanitize data (basic XSS prevention)
        const sanitizedData = {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
        };

        // Try sending email with multiple fallback options
        let emailResult;
        const emailService = process.env.EMAIL_SERVICE || 'resend';

        try {
            switch (emailService.toLowerCase()) {
                case 'resend':
                    emailResult = await sendWithResend(sanitizedData);
                    break;
                case 'nodemailer':
                    emailResult = await sendWithNodemailer(sanitizedData);
                    break;
                case 'formspree':
                    emailResult = await sendWithFormspree(sanitizedData);
                    break;
                default:
                    // Try Resend first, then fallback to Nodemailer
                    try {
                        emailResult = await sendWithResend(sanitizedData);
                    } catch (resendError) {
                        console.warn('Resend failed, trying Nodemailer:', resendError);
                        emailResult = await sendWithNodemailer(sanitizedData);
                    }
            }

            if (!emailResult.success) {
                throw new Error(emailResult.error);
            }

            // Log successful submission (you might want to save to database)
            console.log(`✅ Contact form submission from ${sanitizedData.email}:`, {
                name: sanitizedData.name,
                subject: sanitizedData.subject,
                timestamp: new Date().toISOString(),
                ip,
                service: emailService,
                messageId: emailResult.messageId
            });

            return NextResponse.json({
                success: true,
                message: 'Your message has been sent successfully! I\'ll get back to you soon.',
                messageId: emailResult.messageId
            });

        } catch (emailError) {
            console.error('❌ Email sending failed:', emailError);

            return NextResponse.json(
                {
                    success: false,
                    error: 'Failed to send message. Please try again or contact me directly.',
                    code: 'EMAIL_SEND_ERROR'
                },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('❌ Contact API error:', error);

        return NextResponse.json(
            {
                success: false,
                error: 'An unexpected error occurred. Please try again.',
                code: 'INTERNAL_ERROR'
            },
            { status: 500 }
        );
    }
}

// Handle unsupported methods
export async function GET() {
    return NextResponse.json(
        { error: 'Method not allowed. Use POST to submit contact form.' },
        { status: 405 }
    );
}