import {NextResponse} from 'next/server';
import {Resend} from 'resend';
import {z} from 'zod';
import {serverEnv} from '@/lib/server-env';

const requestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email(),
  phone: z.string().trim().max(30).optional(),
  service: z.string().trim().max(100).optional(),
  message: z.string().trim().min(15).max(3000),
  company: z.string().optional(),
});

export async function POST(request: Request) {
  const parsedRequest = requestSchema.safeParse(await request.json().catch(() => null));

  if (!parsedRequest.success) {
    return NextResponse.json({error: 'Invalid enquiry'}, {status: 400});
  }

  const enquiry = parsedRequest.data;

  if (enquiry.company) {
    return NextResponse.json({ok: true});
  }

  if (!serverEnv.resendApiKey) {
    return NextResponse.json({ok: true, demo: true});
  }

  if (!serverEnv.contactFromEmail || !serverEnv.contactToEmail) {
    console.error('Contact email addresses are not configured');
    return NextResponse.json(
      {error: 'The enquiry service is not configured'},
      {status: 503},
    );
  }

  try {
    const resend = new Resend(serverEnv.resendApiKey);
    const {error} = await resend.emails.send({
      from: serverEnv.contactFromEmail,
      to: serverEnv.contactToEmail,
      replyTo: enquiry.email,
      subject: `Website enquiry: ${enquiry.service || 'General'}`,
      text: [
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        `Phone: ${enquiry.phone || '-'}`,
        `Service: ${enquiry.service || '-'}`,
        '',
        enquiry.message,
      ].join('\n'),
    });

    if (error) throw error;

    return NextResponse.json({ok: true});
  } catch (error) {
    console.error('Contact email delivery failed', error);
    return NextResponse.json(
      {error: 'The enquiry could not be delivered'},
      {status: 502},
    );
  }
}
