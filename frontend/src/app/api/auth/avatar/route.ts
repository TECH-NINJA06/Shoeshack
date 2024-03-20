import { connect } from "@/config/dbConfig";
import { uploadImage } from '@/app/lib/cloudinary';
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";

export default async function handler(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      await connect();
     const reqBody = req.json();
      const imageFile = reqBody.body;

      const uploadedImage = await uploadImage(imageFile);

      // Optionally save image data to MongoDB
        const imageData = {
          url: uploadedImage.url,
          // Add other relevant image metadata
        };

        const user = await db.collection('images').insertOne(imageData);

      res.status(200).json({ url: uploadedImage.url }); // Return uploaded image URL
    } catch (error) {
      res.status(500).json({ message: 'Error uploading image' });
      console.error(error);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
