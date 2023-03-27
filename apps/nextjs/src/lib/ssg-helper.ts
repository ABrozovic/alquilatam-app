import type { GetServerSidePropsContext } from "next";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";

import { appRouter, createTRPCContext } from "@acme/api";

export const getSSGProxy = (ctx: GetServerSidePropsContext) =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: createTRPCContext(ctx),
    transformer: superjson,
  });
