import { type GetServerSidePropsContext } from "next/types";
import { type AnyZodObject, type SafeParseReturnType, type z } from "zod";

export function safeParseQuery<S extends AnyZodObject>(
  ctx: GetServerSidePropsContext,
  schema: S,
): SafeParseReturnType<z.infer<S>, z.infer<S>> {
  return schema.safeParse(ctx.query);
}
