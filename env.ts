
import {z} from 'zod';

const envVariables = z.object({
	NEXT_PUBLIC_SUPABASE_URL: z.string(),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
	SERVICE_ROLE: z.string(),
	PROJECT_ID: z.string(),
	UPLOADTHING_SECRET: z.string(),
	UPLOADTHING_APP_ID: z.string(),
	PAYSTACK_PRIVATE_SECRECT: z.string(),
  PAYSTACK_PUBLIC_SECRECT: z.string(),
  BASE_URL: z.string(),
  RESEND_API_KEY:z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

