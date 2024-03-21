import multer from 'multer';
import { Cloudinary } from 'cloudinary';
import { NextRequest } from 'next/server';

const cloudinary = new Cloudinary({
 cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const config = {
 api: {
    bodyParser: false,
 },
};

export default async function handler(req: NextRequest, res) {
 if (req.method === 'POST') {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'my_next_app_images',
        });

        return res.status(200).json({ url: result.secure_url });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });
 } else {
    res.status(405).json({ error: 'Method not allowed' });
 }
}
