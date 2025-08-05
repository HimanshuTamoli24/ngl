import { z } from "zod";
export const userNameValidationSchema = z.string().min(3, "Username must be at least 3 characters long").max(20, "Username must be at most 20 characters long");
export const signupSchema = z.object({
    username: userNameValidationSchema,
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(100, "Password must be at most 100 characters long"),
})