import { authRouter } from "./router/auth";
import { categoryRouter } from "./router/category";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
