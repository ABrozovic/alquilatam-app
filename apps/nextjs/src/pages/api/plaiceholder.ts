import type { NextApiRequest, NextApiResponse } from "next/types";
import { getPlaiceholder } from "plaiceholder";

import type { Plaiceholder } from "~/lib/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Plaiceholder>,
) {
  const url = req.query.url as string;

  try {
    const { base64 } = await getPlaiceholder(url, {
      size: 5,
    });

    res.status(200).json({
      base64,
    });
  } catch (error) {
    res.status(500).json({
      base64: undefined,
    });
  }
}
