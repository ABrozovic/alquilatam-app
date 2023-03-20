import { TRPCError } from "@trpc/server";
import { type z } from "zod";

import { Prisma, type PrismaClient } from "@acme/db";

import {
  autocompleteSchema,
  categoryImageSchema,
  categorySchema,
} from "./schema";

const createAutocompleteSchema = autocompleteSchema.omit({
  id: true,
});

const createCategoryImageSchema = categoryImageSchema.omit({ id: true });

export const createCategorySchema = categorySchema
  .omit({ id: true, image: true, autocomplete: true })
  .extend({
    image: createCategoryImageSchema,
    autocomplete: createAutocompleteSchema.array().optional(),
  });

export type CreateCategory = z.infer<typeof createCategorySchema>;

export const createCategory = async ({
  prisma,
  data,
}: {
  prisma: PrismaClient;
  data: CreateCategory;
}) => {
  const { autocomplete, image, ...category } = data;
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
        ...(autocomplete && {
          autocomplete: {
            create: autocomplete.map((autoCompleteItem) => autoCompleteItem),
          },
        }),
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
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
