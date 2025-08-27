import dbConnect from "@/lib/dbConnect";
import { MessageModel, UserModel } from "@/models/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { User } from "next-auth"
import mongoose, { mongo } from "mongoose";

export async function GET(req: Request) {
    try {
        await dbConnect()
        const session = await getServerSession(authOptions);
        const user: User = session?.user;
        if (!session || !user) {
            return Response.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }
        const userId = new mongoose.Types.ObjectId(user.id);
        try {
            const user = await UserModel.aggregate([
                {
                    $match: { _id: userId }
                },
                {
                    $unwind: "$messages"
                },
                {
                    $sort: { "messages.createdAt": -1 }
                },
                {
                    $group: {
                        _id: "$_id",
                        messages: { $push: "$messages" },
                    }
                }
            ])
            console.log("user of pipleine ", user);
            if (!user || user.length === 0) {
                return Response.json(
                    { success: false, message: "No messages found" },
                    { status: 404 }
                );
            }
            return Response.json(
                { success: true, data: user[0].messages },
                { status: 200 }
            );


        } catch (error) {
            console.error("Error fetching user messages:", error);
            return Response.json(
                { success: false, message: "Internal server error" },
                { status: 500 }
            );
        }



    } catch (error) {

    }
}