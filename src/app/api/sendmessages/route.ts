import dbConnect from "@/lib/dbConnect";
import { MessageModel, UserModel } from "@/models/user.model";
import { log } from "console";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { username, content } = await req.json();
        console.log("Request body:", { username, content });

        const user = await UserModel.findOne({ username });
        const alluser = await UserModel.find( );

        console.log("User found:",alluser);
        if (!user) {
            return Response.json({ success: false, message: "User not found" }, { status: 404 });
        }

        if (!user.isAcceptingMessages) {
            return Response.json({ success: false, message: "User is not accepting messages" }, { status: 403 });
        }

        // 1️⃣ Create message in Message collection
        const msgDoc = await MessageModel.create({
            content,
            createdAt: new Date()
        });

        // 2️⃣ Push ObjectId to user's messages array
        user.messages.push(msgDoc._id);
        await user.save();

        return Response.json(
            { success: true, message: "Message sent successfully", data: msgDoc },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending message:", error);
        return Response.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
