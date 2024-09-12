import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { resetPasswordTemplate } from '../email-templates/reset-password';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, resetLink } = await request.json();

    await resend.emails.send({
      from: 'Agint AI <noreply@aglinthq.com>',
      to: email,
      subject: 'Reset Your Password from Resend',
      html: resetPasswordTemplate({ resetLink }),
    });

    return NextResponse.json({ message: 'Reset password email sent' }, { status: 200 });
  } catch (error) {
    console.error('Error sending reset password email:', error);
    return NextResponse.json({ error: 'Failed to send reset password email' }, { status: 500 });
  }
}