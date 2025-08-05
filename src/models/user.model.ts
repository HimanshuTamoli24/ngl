import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpire: Date;
    isVerified: boolean;
    messages: Message[];
    isAcceptingMessages: boolean;
}

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const userSchema = new Schema<User>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyCode: { type: String, required: true },
    verifyCodeExpire: { type: Date, default: () => new Date(Date.now() + 10 * 60 * 1000) },
    isVerified: { type: Boolean, default: false },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    isAcceptingMessages: { type: Boolean, default: true },
});

const messageSchema = new Schema<Message>({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", userSchema);

const MessageModel = mongoose.models.Message as mongoose.Model<Message> || mongoose.model<Message>("Message", messageSchema);

export { MessageModel, UserModel };
