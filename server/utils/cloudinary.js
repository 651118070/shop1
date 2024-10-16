import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { config } from "dotenv";
config()
// Configuring Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Setting up multer to store files in memory
const storage = multer.memoryStorage();

// Utility to upload an image to Cloudinary
export async function imageUploadUtil(imageBase64) {
  try {
    const result = await cloudinary.uploader.upload(imageBase64, {
      resource_type: 'auto',
    });
    return result;
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
}

// Exporting the multer instance for image uploads
export const upload = multer({ storage });
