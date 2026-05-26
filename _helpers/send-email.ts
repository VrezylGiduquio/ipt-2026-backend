import { Resend } from 'resend';

export default async function sendEmail({ to, subject, html, from = process.env.EMAIL_FROM }: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const data = await resend.emails.send({
      from,
      to: [to],
      subject,
      html
    });
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}