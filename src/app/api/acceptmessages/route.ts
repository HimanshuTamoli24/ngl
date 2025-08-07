import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { UserModel } from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const session = await getServerSession(authOptions);
        const user: User = session?.user;

        if (!session || !user) {
            return Response.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = user._id;
        const { acceptMessages } = await req.json();

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages: acceptMessages },
            { new: true }
        );

        if (!updatedUser) {
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "Messages acceptance status updated successfully",
                data: updatedUser,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in accept messages route", error);
        return Response.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        await dbConnect();

        const session = await getServerSession(authOptions);
        const user: User = session?.user;

        if (!session || !user) {
            return Response.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = user._id;
        const userData = await UserModel.findById(userId);

        if (!userData) {
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "User data retrieved successfully",
                data: userData.isAcceptingMessages,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in accept messages route", error);
        return Response.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
