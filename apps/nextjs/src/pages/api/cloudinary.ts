import type { NextApiRequest, NextApiResponse } from "next/types";
import * as cloudinary from "cloudinary";

import { env } from "~/env.mjs";

export const config = {
  api: {
    bodyParser: false,
  },
};
export type CloudinarySignature = {
  signature: string;
  folder: string;
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CloudinarySignature>,
) {
  const { timestamp, folder, ...query } = req.query;
  cloudinary.v2.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
  try {
    const signature = cloudinary.v2.utils.api_sign_request(
      {
        timestamp,
        ...query,
        folder: `${env.CLOUDINARY_BASE_DIRECTORY}/${folder}`,
      },
      env.CLOUDINARY_API_SECRET,
    );

    res.status(200).json({
      signature,
      folder: `${env.CLOUDINARY_BASE_DIRECTORY}/${folder}`,
    });
  } catch (error) {
    res.status(500);
  }
}
