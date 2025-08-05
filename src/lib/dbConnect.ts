import mongoose from "mongoose";
import { env } from "../env";
type connectionObject = {
    isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        return;
    }
    try {
        const db = await mongoose.connect(env.MONGODB_URI);
        connection.isConnected = db.connections[0].readyState;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }

}

export default dbConnect;