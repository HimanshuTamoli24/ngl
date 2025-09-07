
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/dbConnect';
import { User } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import { MessageModel, UserModel } from '@/models/user.model';
import mongoose from 'mongoose';


export async function DELETE(
    request: Request,
    context: { params: Promise<{ messageid: string }> }
) {
    const { messageid } = await context.params;
    // console.log("Message ID to delete:", messageid);

    await dbConnect();
    const session = await getServerSession(authOptions);
    const _user: User = session?.user;
    if (!session || !_user) {
        return Response.json(
            { success: false, message: 'Not authenticated' },
            { status: 401 }
        );
    }
    if (!messageid) {
        return Response.json(
            { success: false, message: 'Message ID is required' },
            { status: 400 }
        );
    }
    // console.log("Authenticated user:", _user);

    try {

        // console.log("+++++++++++++++++++++++++++++++++", await UserModel.find());

        const updateResult = await UserModel.updateOne(
            { _id: new mongoose.Types.ObjectId(_user.id) },
            { $pull: { messages: new mongoose.Types.ObjectId(messageid) } }
        );
        // console.log("Update Result:", updateResult);

        if (updateResult.modifiedCount === 0) {
            return Response.json(
                { message: 'Message not found or already deleted', success: false },
                { status: 404 }
            );
        }

        return Response.json(
            { message: 'Message deleted', success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting message:', error);
        return Response.json(
            { message: 'Error deleting message', success: false },
            { status: 500 }
        );
    }
}