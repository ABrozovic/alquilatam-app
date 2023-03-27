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

type ExtractProducts<T> = T extends { products: Product[] }
  ? Pick<T, "products">
  : never;
export type ProductByCategory = ExtractProducts<
  Exclude<RouterOutputs["product"]["getByCategory"], undefined>
>["products"][number];

export const getProductByCategory = async ({
  prisma,
  data,
}: {
  prisma: PrismaClient;
  data: GetProductByCategory;
}) => {
  const limit = data.pageSize ?? 5;
  const { categorySlug, cursor } = data;
  try {
    const products = await prisma.product.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
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
