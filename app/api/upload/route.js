// app/api/upload/route.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const { image, folder } = await request.json(); // accept folder from the request

  const result = await cloudinary.uploader.upload(image, {
    folder: `termiportfolio/${folder}`, // e.g. termiportfolio/images
  });

  return Response.json({ url: result.secure_url, public_id: result.public_id });
}