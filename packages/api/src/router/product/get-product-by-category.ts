import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { type PrismaClient } from "@acme/db";

import { isTRPCClientError } from "../../util/error-handler";

export const getProductByCategorySchema = z.object({
  categoryId: z.string(),
  pageSize: z.number().optional(),
  cursor: z.string().nullish(),
});
export type GetProductByCategory = z.infer<typeof getProductByCategorySchema>;
export const getProductByCategory = async ({
  prisma,
  data,
}: {
  prisma: PrismaClient;
  data: GetProductByCategory;
}) => {
  const limit = data.pageSize ?? 5;
  const { categoryId, cursor } = data;
  try {
    const products = await prisma.product.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        categoryId,
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
    let nextCursor: typeof cursor | undefined = undefined;
    if (products.length > limit) {
      const nextProduct = products.pop();
      nextCursor = nextProduct && nextProduct.id;
    }
    return {
      products: products,
      nextCursor,
    };
  } catch (e) {
    if (isTRPCClientError(e)) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      });
    }
  }
};
