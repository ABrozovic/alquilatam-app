import * as cloudinary from "cloudinary";

import { env } from "~/env.mjs";

export type CloudinaryResponse = {
  width: number;
  height: number;
  public_id: string;
  created_at: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  bytes: string;
};

export type Plaiceholder = {
  base64: string | undefined;
};

export type ImageUpload = CloudinaryResponse & Partial<Plaiceholder>;

export const deleteCloudinaryImage = async (image: string) => {
  cloudinary.v2.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
  try {
    await cloudinary.v2.uploader.destroy(image);
  } catch (err) {
    console.log(err);
  }
};
