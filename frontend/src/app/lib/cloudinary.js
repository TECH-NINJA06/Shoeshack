import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImage = async (imageFile) => {
  const uploadResponse = await cloudinary.uploader.upload(imageFile, {
    // Add any necessary upload options (e.g., transformations)
  });

  return uploadResponse;
};
