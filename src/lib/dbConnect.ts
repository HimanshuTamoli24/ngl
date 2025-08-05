import mongoose from "mongoose";    

type connectionObject= {
    isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI );
    } catch (error) {
        
    }

}