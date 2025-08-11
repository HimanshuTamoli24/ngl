import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { userNameValidationSchema } from "@/schemas/signupSchema";
import z from "zod";

const usernameSchema = z.object({
    username: userNameValidationSchema
});

export async function GET(req: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const rawUsername = searchParams.get("username") || "";

        if (rawUsername.trim().length < 3) {
            return Response.json({
                success: false,
                message: "Username must be at least 3 characters long"
            }, { status: 400 });
        }

        const results = usernameSchema.safeParse({ username: rawUsername });


        if (!results.success) {
            return Response.json({
                success: false,
                message: results.error.format().username?._errors || ["Invalid username format"]
            }, { status: 400 });
        }

        const { username: validUsername } = results.data;

        const isExist = await UserModel.findOne({
            username: validUsername,
            isVerified: true
        });

        if (isExist) {
            return Response.json({
                success: false,
                message: "Username already exists"
            }, { status: 200 });
        }

        return Response.json({
            success: true,
            message: "Username is available"
        }, { status: 200 });

    } catch (error) {
        console.error("Error in unique username route", error);
        return Response.json({
            success: false,
            message: "Server error while checking username"
        }, { status: 500 });
    }
}
