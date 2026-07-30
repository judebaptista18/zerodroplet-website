import 'server-only';

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const serverEnv = {
  openAiApiKey: process.env.OPENAI_API_KEY,
  openAiModel: required('OPENAI_MODEL', process.env.OPENAI_MODEL),
  resendApiKey: process.env.RESEND_API_KEY,
  contactFromEmail: process.env.CONTACT_FROM_EMAIL,
  contactToEmail: process.env.CONTACT_TO_EMAIL,
} as const;
