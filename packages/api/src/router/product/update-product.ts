import { type z } from "zod";

import { type PrismaClient } from "@acme/db";

import { productSchema } from "./schema";

export const updateProductSchema = productSchema.partial();
export type UpdateProduct = z.infer<typeof updateProductSchema>;
export const updateProduct = async ({
  prisma,
  data,
}: {
  prisma: PrismaClient;
  data: UpdateProduct;
}) => {
  const { id, userId, images, ...rest } = data;
  //TODO: Handle deletion
  // console.log(
  //   "🚀 ~ file: product.router.ts:57 ~ .mutation ~ toDelete",
  //   toDelete,
  // );
  // toDelete?.imageIds?.map(async (id) => {
  //   console.log(await deleteCloudinaryImage(id));
  // });
  const isAdmin = false;
  await prisma.product.update({
    where: {
      id,
      ...(!isAdmin && {
        user: {
          id: userId,
        },
      }),
    },
    data: {
      ...rest,
      images: {
        //TODO: Handle deletion
        // deleteMany: {
        //   id: {
        //     in: toDelete?.imageIds,
        //   },
        // },
        ...(images && {
          create: images.map((image) => image),
        }),
      },
    },
  });
};
