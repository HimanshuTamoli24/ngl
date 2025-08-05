export const env = {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
    MONGODB_URI: process.env.MONGODB_URI!,
    RESEND_API_KEY: process.env.RESEND_API_KEY!,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
};
export const isProd = process.env.NODE_ENV === "production";
export const isDev = process.env.NODE_ENV === "development";    