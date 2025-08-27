import { Resend } from "resend";
import VerificationEmail from "../../Emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { env } from "@/env";
const resend = new Resend(env.RESEND_API_KEY);

async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        const { error, data } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'verification code',
            react: VerificationEmail({ username: username, otp: verifyCode }),
        });
        console.log("Email sent:", data);

        if (error) {
            console.error("Error sending email:", error);
            return {
                success: false,
                message: "Failed to send verification email.",
            };
        }
        
        return {
            success: true,
            message: "Verification email sent successfully.",
            isAcceptingMessage: true,
        };
    } catch (error) {
        console.error("Error sending verification email:", error);
        return {
            success: false,
            message: "Failed to send verification email.",
        };

    }
}

export default sendVerificationEmail;