import { EmailData, EmailResult } from './resend';

export async function sendWithFormspree(data: EmailData): Promise<EmailResult> {
    try {
        const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

        if (!formspreeEndpoint) {
            throw new Error('FORMSPREE_ENDPOINT not configured');
        }

        const response = await fetch(formspreeEndpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message,
                _replyto: data.email,
                _subject: `Portfolio Contact: ${data.subject}`,
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Formspree API error: ${response.status} - ${errorData}`);
        }

        const result = await response.json();

        return {
            success: true,
            messageId: result.id || 'formspree-' + Date.now(),
        };

    } catch (error) {
        console.error('Formspree error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}