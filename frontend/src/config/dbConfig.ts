'use server'
import mongoose from "mongoose";

//Using use server as layout.tsx is made client for redux toolkit
export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connection established")
        });
        
        connection.on('error', (error) => {
            console.error("MongoDB connection error:", error);
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
