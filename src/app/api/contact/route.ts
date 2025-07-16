import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, company, email, phone } = await request.json();

    // Validate required fields
    if (!name || !company || !email) {
      return NextResponse.json(
        { error: 'Name, company, and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
New Demo Request from ${company}

Contact Details:
- Name: ${name}
- Company: ${company}
- Email: ${email}
- Phone: ${phone || 'Not provided'}

This request was submitted through the website contact form.
    `.trim();

    // For production, you would integrate with an email service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Nodemailer with SMTP
    
    // For now, we'll simulate the email sending
    console.log('Demo request received:', {
      name,
      company,
      email,
      phone,
      timestamp: new Date().toISOString()
    });

    // TODO: Replace this with actual email sending service
    // Example with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'sales@verspec.ai',
      from: 'noreply@verspec.ai', // Use your verified sender
      subject: `New Demo Request from ${company}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
    };

    await sgMail.send(msg);
    */

    // For development, you could also use a service like Resend:
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'noreply@verspec.ai',
      to: 'sales@verspec.ai',
      subject: `New Demo Request from ${company}`,
      html: emailContent.replace(/\n/g, '<br>'),
    });
    */

    return NextResponse.json(
      { message: 'Demo request submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 