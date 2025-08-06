import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { verifySchema } from "@/schemas/verifySchema";
import z from "zod";
const verifyCodeSchema = z.object({
    otp: verifySchema
})

async function POST(req: Request) {
    try {
        await dbConnect()
        const { username, code } = await req.json()
        const results = verifyCodeSchema.safeParse({ otp: code });
        console.log("Results of verify code validation:", results);
        const isUserValid = await UserModel.findOne({ username })
        if (!isUserValid) {
            return Response.json({
                success: false,
                message: "Invalid username"
            }, { status: 400 });
        }


        const isUserCodeValid = isUserValid.isVerified === code;
        const isUserCodeExpiry = isUserValid.verifyCodeExpire > new Date();
        if (isUserCodeExpiry && isUserCodeValid) {
            isUserValid.isVerified = true;
            isUserValid.verifyCode = "";
            isUserValid.verifyCodeExpire = new Date();
            await isUserValid.save();
            return Response.json({
                success: true,
                message: "Code verified successfully"
            }, { status: 200 });
        } else if (!isUserCodeExpiry) {
            return Response.json({
                success: false,
                message: "Code expired, please request a new code"
            }, { status: 400 });

        }






    } catch (error) {
        console.error("Error in verify code route", error);
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });

    }

}