import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { userNameValidationSchema } from "@/schemas/signupSchema";
import z from "zod";
const usernameSchema = z.object({
    username: userNameValidationSchema
})
export async function GET(req: Request) {
    try {
        await dbConnect()
        const { searchParams } = new URL(req.url);
        // may b reak code here re fixc things
        const username = searchParams.get('username');
        const results = usernameSchema.safeParse({ username });
        console.log("Results of username validation:", results);
        if (!results.success) {
            return Response.json({
                success: false,
                message: results.error.format().username?._errors || ["Invalid username format"]
            }, { status: 400 });
        }
        const { username: validUsername } = results.data;
        const isExist = await UserModel.findOne({ username: validUsername, isVerified: true })
        if (isExist) {
            return Response.json({
                success: false,
                message: "Username already exists"
            }, { status: 200 });
        } else {
            return Response.json({
                success: true,
                message: "Username is available"
            }, { status: 200 });
        }


    } catch (error) {
        console.error("Error in unique username route", error);
        return Response.json({
            success: false,
        }, { status: 500 });
    }
}