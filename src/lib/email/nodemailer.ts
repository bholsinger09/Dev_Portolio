import nodemailer from 'nodemailer';
import { EmailData, EmailResult } from './resend';

export async function sendWithNodemailer(data: EmailData): Promise<EmailResult> {
    try {
        // Create transporter based on environment configuration
        let transporter;

        if (process.env.SMTP_HOST) {
            // Custom SMTP configuration
            transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || '587'),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });
        } else if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
            // Gmail configuration
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
                },
            });
        } else {
            throw new Error('No email configuration found. Please set SMTP or Gmail credentials.');
        }

        // Verify transporter configuration
        await transporter.verify();

        const mailOptions = {
            from: {
                name: 'Portfolio Contact Form',
                address: process.env.SMTP_USER || process.env.GMAIL_USER || 'noreply@portfolio.com',
            },
            to: process.env.CONTACT_EMAIL || 'ben.holsinger@example.com',
            replyTo: {
                name: data.name,
                address: data.email,
            },
            subject: `Portfolio Contact: ${data.subject}`,
            html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Portfolio Contact</title>
        </head>
        <body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
                New Portfolio Contact
              </h1>
              <p style="color: #bfdbfe; margin: 10px 0 0 0; font-size: 16px;">
                Someone reached out through your portfolio!
              </p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px;">
              <div style="background: #f8fafc; border-radius: 6px; padding: 25px; margin-bottom: 25px;">
                <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px;">Contact Information</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; vertical-align: top; width: 80px;">
                      <strong style="color: #374151;">Name:</strong>
                    </td>
                    <td style="padding: 8px 0; color: #6b7280;">
                      ${data.name}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; vertical-align: top;">
                      <strong style="color: #374151;">Email:</strong>
                    </td>
                    <td style="padding: 8px 0;">
                      <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">
                        ${data.email}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; vertical-align: top;">
                      <strong style="color: #374151;">Subject:</strong>
                    </td>
                    <td style="padding: 8px 0; color: #6b7280;">
                      ${data.subject}
                    </td>
                  </tr>
                </table>
              </div>
              
              <div>
                <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
                <div style="background: #ffffff; border: 2px solid #e5e7eb; border-radius: 6px; padding: 20px; color: #374151; line-height: 1.6;">
                  ${data.message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <!-- Action Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" 
                   style="display: inline-block; background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);">
                  Reply to ${data.name}
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                📧 Sent from your portfolio contact form<br>
                🕐 ${new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                timeZoneName: 'short'
            })}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
            // Plain text fallback
            text: `
Portfolio Contact Form Submission

From: ${data.name} <${data.email}>
Subject: ${data.subject}

Message:
${data.message}

---
Reply to: ${data.email}
Sent: ${new Date().toLocaleString()}
      `.trim(),
        };

        const info = await transporter.sendMail(mailOptions);

        return {
            success: true,
            messageId: info.messageId,
        };

    } catch (error) {
        console.error('Nodemailer error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}