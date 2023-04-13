import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { type PrismaClient, type Product } from "@acme/db";

import { type RouterOutputs } from "../../trpc";
import { isTRPCClientError } from "../../util/error-handler";

export const getProductByCategorySchema = z.object({
  categorySlug: z.string(),
  pageSize: z.number().optional(),
  cursor: z.string().nullish(),
});
export type GetProductByCategory = z.infer<typeof getProductByCategorySchema>;

export type ProductByCategory = RouterOutputs["product"]["getByCategory"];

type Test<T extends ProductByCategory> = T extends undefined ? never : T;

export const getProductByCategory = async ({
  prisma,
  data,
}: {
  prisma: PrismaClient;
  data: GetProductByCategory;
}) => {
  const { categorySlug } = data;
  try {
    return await prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      include: {
        images: true,
      },
      orderBy: [
        {
          isFeatured: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });
  } catch (e) {
    if (isTRPCClientError(e)) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      });
    }
  }
};
