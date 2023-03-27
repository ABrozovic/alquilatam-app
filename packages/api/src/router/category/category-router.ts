import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { trpcWithErrorHandling } from "../../util/error-handler";
import { createCategory, createCategorySchema } from "./create-category";
import { updateCategory, updateCategorySchema } from "./update-category";

export const categoryRouter = createTRPCRouter({
  create: adminProcedure
    .input(createCategorySchema)
    .mutation(async ({ ctx, input }) =>
      createCategory({ prisma: ctx.prisma, data: input }),
    ),
  update: adminProcedure
    .input(updateCategorySchema)
    .mutation(async ({ ctx, input }) =>
      updateCategory({ prisma: ctx.prisma, data: input }),
    ),
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      return trpcWithErrorHandling(
        ctx.prisma.category.delete({
          where: { id },
        }),
      );
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return trpcWithErrorHandling(
      ctx.prisma.category.findMany({
        include: {
          autocomplete: true,
          image: true,
        },
      }),
    );
  }),
  getById: protectedProcedure
    .input(z.object({ categoryId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { categoryId: id } = input;
      return trpcWithErrorHandling(
        ctx.prisma.category.findUnique({
          where: { id },
          include: {
            autocomplete: true,
            image: true,
          },
        }),
      );
    }),
  getBySlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const { slug } = input;
      return trpcWithErrorHandling(
        ctx.prisma.category.findUnique({
          where: { slug },
          include: {
            autocomplete: true,
            image: true,
          },
        }),
      );
    }),
});
