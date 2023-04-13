import { type z } from "zod";

import { type PrismaClient } from "@acme/db";

import { trpcWithErrorHandling } from "../../util/error-handler";
import { fileSchema } from "../category/schema";
import { productImageSchema, productSchema } from "./schema";

export const createProductSchema = productSchema
  .omit({ id: true, images: true })
  .extend({
    images: productImageSchema.omit({ id: true, productId: true }).array(),
  });
export type CreateProduct = z.infer<typeof createProductSchema>;

export const createProductFormSchema = createProductSchema
  .omit({ images: true })
  .extend({
    images: fileSchema
      .array()
      .min(1, { message: "Debes agregar al menos 1 imagen" }),
  });
export type CreateProductForm = z.infer<typeof createProductFormSchema>;

export const createProduct = ({
  prisma,
  data,
}: {
  prisma: PrismaClient;
  data: CreateProduct;
}) => {
  const { categoryId, userId, images, ...rest } = data;
  console.log("🚀 ~ file: create-product.ts:29 ~ rest:", rest);
  console.log("🚀 ~ file: create-product.ts:29 ~ images:", images);
  console.log("🚀 ~ file: create-product.ts:29 ~ userId:", userId);
  console.log("🚀 ~ file: create-product.ts:29 ~ categoryId:", categoryId);
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
            userId,
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
