import {NextResponse} from 'next/server';
import OpenAI from 'openai';
import {z} from 'zod';
import {serverEnv} from '@/lib/server-env';

const requestSchema = z.object({
  message: z.string().trim().min(1).max(1000),
});

const fallbackAnswer =
  'Thanks for your question. Please share your location, required capacity, application and contact details through our enquiry form so an engineer can assess it.';

const businessContext =
  'Zero Droplet Engineers and Consultants is based in Margao, Goa and serves South India. It designs, supplies, installs and maintains water and wastewater treatment plants. Services include RO, softening, iron removal, DM plants, STP, MBR, SBR, ETP, ZLD, DAF, ozonation, sludge handling, process monitoring, automation, annual maintenance and consultancy. The assistant must not provide a binding quotation or guarantee compliance. It should gather location, capacity, application and contact details, and direct users to the contact form for engineering assessment.';

export async function POST(request: Request) {
  const parsedRequest = requestSchema.safeParse(await request.json().catch(() => null));

  if (!parsedRequest.success) {
    return NextResponse.json({error: 'Invalid request'}, {status: 400});
  }

  if (!serverEnv.openAiApiKey) {
    return NextResponse.json({answer: fallbackAnswer});
  }

  try {
    const client = new OpenAI({apiKey: serverEnv.openAiApiKey});
    const response = await client.responses.create({
      model: serverEnv.openAiModel,
      instructions: `You are the Zero Droplet website assistant. Use only this business context: ${businessContext} Keep answers concise. Never invent prices, certifications or project claims.`,
      input: parsedRequest.data.message,
      max_output_tokens: 250,
    });

    return NextResponse.json({answer: response.output_text || fallbackAnswer});
  } catch (error) {
    console.error('Chat completion failed', error);
    return NextResponse.json(
      {error: 'The assistant is temporarily unavailable'},
      {status: 502},
    );
  }
}
