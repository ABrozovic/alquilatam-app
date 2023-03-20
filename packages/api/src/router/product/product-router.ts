import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { trpcWithErrorHandling } from "../../util/error-handler";
import { createProduct, createProductSchema } from "./create-product";
import {
  getProductByCategory,
  getProductByCategorySchema,
} from "./get-product-by-category";
import {
  getProductByName,
  getProductByNameSchema,
} from "./get-product-by-name";
import { updateProduct, updateProductSchema } from "./update-product";

export const productRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createProductSchema)
    .mutation(async ({ ctx, input }) =>
      createProduct({ prisma: ctx.prisma, data: input }),
    ),
  update: protectedProcedure
    .input(updateProductSchema)
    .mutation(async ({ ctx, input }) =>
      updateProduct({ prisma: ctx.prisma, data: input }),
    ),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      return trpcWithErrorHandling(
        ctx.prisma.product.delete({
          where: { id },
        }),
      );
    }),
  getByCategory: publicProcedure
    .input(getProductByCategorySchema)
    .query(async ({ ctx, input }) =>
      getProductByCategory({ prisma: ctx.prisma, data: input }),
    ),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return trpcWithErrorHandling(
      ctx.prisma.product.findMany({
        include: {
          images: true,
          category: true,
        },
      }),
    );
  }),
  getByUser: protectedProcedure.query(async ({ ctx }) => {
    return trpcWithErrorHandling(
      ctx.prisma.product.findMany({
        where: {
          userId: ctx.auth.userId,
        },
        include: {
          images: true,
          category: true,
        },
      }),
    );
  }),
  getById: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { productId: id } = input;
      const isAdmin = ctx.auth.orgSlug === "ADMIN";
      return trpcWithErrorHandling(
        ctx.prisma.product.findUnique({
          where: { id },
          include: {
            images: true,
            category: true,
            ...(isAdmin && {
              views: true,
            }),
            user: true,
          },
        }),
      );
    }),
  addView: publicProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { productId: id } = input;
      return trpcWithErrorHandling(
        ctx.prisma.product.update({
          where: { id },
          data: {
            views: {
              create: {
                user: {
                  connect: {
                    id: ctx.auth.userId || "Anonymous",
                  },
                },
              },
            },
          },
        }),
      );
    }),
  getByName: publicProcedure
    .input(getProductByNameSchema)
    .query(async ({ ctx, input }) =>
      getProductByName({ prisma: ctx.prisma, data: input }),
    ),
});
