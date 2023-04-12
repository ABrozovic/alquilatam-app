import { TRPCError } from "@trpc/server";
import { type z } from "zod";

import { type PrismaClient } from "@acme/db";

import { categoryImageSchema, categorySchema, fileSchema } from "./schema";

export const createCategorySchema = categorySchema
  .omit({ id: true, image: true })
  .extend({
    image: categoryImageSchema.omit({ categoryId: true, id: true }),
  });
export type CreateCategory = z.infer<typeof createCategorySchema>;

export const createCategoryForm = createCategorySchema
  .omit({ image: true })
  .extend({ image: fileSchema });
export type CreateCategoryForm = z.infer<typeof createCategoryForm>;

export const createCategory = async ({
  prisma,
  data,
}: {
  prisma: PrismaClient;
  data: CreateCategory;
}) => {
  const { image, ...category } = data;
  const categoryExists = await prisma.category.findFirst({
    where: { name: category.name },
  });
  if (categoryExists) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Category already exists",
    });
  }
  try {
    return await prisma.category.create({
      data: {
        ...category,
        image: { create: { ...image } },
      },
    });
  } catch (error) {
    if (isPrismaErrorP2002(error)) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Category already exists",
      });
    }
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    });
  }
};
interface CustomPrismaClientKnownRequestError extends Error {
  code: string;
}
export function isPrismaErrorP2002(
  error: Error | unknown,
): error is CustomPrismaClientKnownRequestError {
  return error instanceof Error && "code" in error && error.code === "P2002";
}
