import { Resend } from 'resend';

export interface EmailData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface EmailResult {
    success: boolean;
    messageId?: string;
    error?: string;
}

// Initialize Resend (modern email API service) - only if API key is provided
let resend: Resend | null = null;

const initializeResend = () => {
    if (!resend && process.env.RESEND_API_KEY) {
        resend = new Resend(process.env.RESEND_API_KEY);
    }
    return resend;
};

export async function sendWithResend(data: EmailData): Promise<EmailResult> {
    try {
        const resendClient = initializeResend();

        if (!resendClient) {
            throw new Error('RESEND_API_KEY not configured');
        }

        const result = await resendClient.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'portfolio@your-domain.com',
            to: [process.env.CONTACT_EMAIL || 'ben.holsinger@example.com'],
            subject: `Portfolio Contact: ${data.subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Portfolio Contact</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h2 style="color: #1f2937; margin-top: 0;">Contact Details</h2>
              
              <div style="margin: 15px 0;">
                <strong style="color: #374151;">Name:</strong>
                <span style="color: #6b7280; margin-left: 10px;">${data.name}</span>
              </div>
              
              <div style="margin: 15px 0;">
                <strong style="color: #374151;">Email:</strong>
                <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none; margin-left: 10px;">${data.email}</a>
              </div>
              
              <div style="margin: 15px 0;">
                <strong style="color: #374151;">Subject:</strong>
                <span style="color: #6b7280; margin-left: 10px;">${data.subject}</span>
              </div>
              
              <div style="margin: 20px 0 0 0;">
                <strong style="color: #374151;">Message:</strong>
                <div style="background: #f3f4f6; padding: 15px; border-radius: 4px; margin-top: 10px; color: #374151; line-height: 1.6;">
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:${data.email}?subject=Re: ${data.subject}" 
                 style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Reply to ${data.name}
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 20px;">
              Sent from your portfolio contact form • ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
            replyTo: data.email,
        });

        if (result.error) {
            throw new Error(result.error.message);
        }

        return {
            success: true,
            messageId: result.data?.id,
        };

    } catch (error) {
        console.error('Resend email error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}