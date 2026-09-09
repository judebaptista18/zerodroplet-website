import 'server-only';
import {serverConfig} from './server-config';

export const serverEnv = {
  ...serverConfig,
  openAiApiKey: process.env.OPENAI_API_KEY,
  resendApiKey: process.env.RESEND_API_KEY,
  googleFormsWebhookUrl: process.env.GOOGLE_FORMS_WEBHOOK_URL,
  googleFormsWebhookSecret: process.env.GOOGLE_FORMS_WEBHOOK_SECRET,
} as const;
