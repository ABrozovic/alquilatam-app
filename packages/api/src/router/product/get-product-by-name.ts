import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { type PrismaClient } from "@acme/db";

import { isTRPCClientError } from "../../util/error-handler";

export const getProductByNameSchema = z.object({
  productName: z.string(),
  pageSize: z.number().optional(),
  cursor: z.string().nullish(),
});
export type GetProductByName = z.infer<typeof getProductByNameSchema>;
export const getProductByName = async ({
  prisma,
  data,
}: {
  prisma: PrismaClient;
  data: GetProductByName;
}) => {
  const limit = 5;
  const { productName, cursor } = data;
  try {
    const products = await prisma.product.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        name: {
          search: productName.replace("+", " | "),
        },
      },
      include: {
        images: true,
        category: true,
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
      nextCursor = nextProduct?.id;
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
