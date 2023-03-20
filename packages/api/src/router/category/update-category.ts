import { type z } from "zod";

import { type PrismaClient } from "@acme/db";

import { categorySchema } from "./schema";

export const updateCategorySchema = categorySchema.partial();
export type UpdateCategory = z.infer<typeof updateCategorySchema>;

export const updateCategory = async ({
  prisma,
  data,
}: {
  prisma: PrismaClient;
  data: UpdateCategory;
}) => {
  const { id, autocomplete, image, name } = data;

  return await prisma.category.update({
    where: { id },
    data: {
      name,
      autocomplete: {
        create: autocomplete?.map(({ name }) => ({
          name,
        })),
        // TODO: HANDLE delete autocomplete logic
        // deleteMany: {
        //   id: {
        //     in: toDelete.autoCompleteIds,
        //   },
        // },
      },
      image: {
        ...(image && {
          create: {
            ...image,
          },
          // TODO: HANDLE delete image logic
          // first call to cloudinary and then update db
          // deleteMany: {
          //   id: {
          //     in: toDelete.images,
          //   },
          // },
        }),
      },
    },
  });
};
