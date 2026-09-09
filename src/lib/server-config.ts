import 'server-only';

// Non-secret integration settings. Configure a verified sender before enabling Resend.
export const serverConfig = {
  openAiModel: "gpt-4.1-mini",
  contactFromEmail: "",
  contactToEmail: "",
} as const;
