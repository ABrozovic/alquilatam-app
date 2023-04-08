import axios from "axios";

import { env } from "~/env.mjs";
import type {
  CloudinaryResponse,
  ImageUpload,
  Plaiceholder,
} from "~/lib/cloudinary";
import type { CloudinarySignature } from "~/pages/api/cloudinary";

const UPLOAD_ENDPOINT =
  "https://api.cloudinary.com/v1_1/" +
  env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME +
  "/image/upload";

export async function handleCloudinaryUpload(files: File[], directory: string) {
  const filesWithSignature = await Promise.all(
    files.map((file) => generateSignature(file, directory)),
  );
  const uploadedFiles = await Promise.all(
    filesWithSignature.map(uploadToCloudinary),
  );

  const result = uploadedFiles.filter(isDefined);
  return result;
}
const generateSignature = async (file: File, directory: string) => {
  const timestamp = String(Math.round(new Date().getTime() / 1000));
  const {
    data: { signature, folder },
    status,
  } = await axios.get<CloudinarySignature>(
    `/api/cloudinary?timestamp=${timestamp}&folder=${directory}`,
  );
  if (status === 500) return;
  return { file, signature, timestamp, folder };
};

const uploadToCloudinary = async (fileWithSignature?: {
  file: File;
  signature: string;
  timestamp: string;
  folder: string;
}): Promise<ImageUpload | undefined> => {
  if (!fileWithSignature) return;
  const { file, timestamp, signature, folder } = { ...fileWithSignature };
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  formData.append("api_key", env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  try {
    const { data: cloudinaryUpload } = await axios.post<CloudinaryResponse>(
      UPLOAD_ENDPOINT,
      formData,
    );
    const plaiceholder = await generatePlaiceholder(cloudinaryUpload.url);
    return {
      ...cloudinaryUpload,
      base64: plaiceholder?.base64,
    };
  } catch (error) {
    console.log(error);
  }
};

const generatePlaiceholder = async (
  url: string,
): Promise<Plaiceholder | undefined> => {
  const { data } = await axios.get<Plaiceholder>(
    `/api/plaiceholder?url=${url}`,
  );
  return { ...data };
};

const isDefined = <T>(value: T | undefined): value is T => {
  return value !== undefined;
};
