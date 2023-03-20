import { type z } from "zod";

import { type PrismaClient } from "@acme/db";

import { trpcWithErrorHandling } from "../../util/error-handler";
import { productSchema } from "./schema";

export const createProductSchema = productSchema.omit({ id: true });
export type CreateProduct = z.infer<typeof createProductSchema>;
export const createProduct = ({
  prisma,
  data,
}: {
  prisma: PrismaClient;
  data: CreateProduct;
}) => {
  const { categoryId, userId, images, ...rest } = data;
  return trpcWithErrorHandling(
    prisma.product.create({
      data: {
        category: {
          connect: {
            id: categoryId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        ...(images && {
          images: {
            create: images.map((image) => image),
          },
        }),

        ...rest,
      },
    }),
  );
};
