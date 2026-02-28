import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/contact-schema'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Server-side validation
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = parsed.data

    const toEmail = process.env.CONTACT_TO_EMAIL
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

    if (!toEmail) {
      console.error('CONTACT_TO_EMAIL is not set')
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
    }

    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: linear-gradient(135deg, #a755f0, #d946ef); padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; color: #fff; font-size: 22px;">New Contact Message</h1>
            <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">From your portfolio website</p>
          </div>
          <div style="background: #f9f9f9; border: 1px solid #e5e5e5; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #888; width: 80px; vertical-align: top;">Name</td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #888; vertical-align: top;">Email</td>
                <td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #a755f0;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 13px; color: #888; vertical-align: top;">Subject</td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: 600;">${subject}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
            <p style="margin: 0 0 8px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <p style="margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0 16px;" />
            <p style="margin: 0; font-size: 12px; color: #aaa;">
              Reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
      `,
      text: `New contact from ${name} <${email}>\n\nSubject: ${subject}\n\nMessage:\n${message}`,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
