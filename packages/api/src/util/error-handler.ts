import { TRPCError } from "@trpc/server";

export const trpcWithErrorHandling = async <T>(
  promise: Promise<T>,
): Promise<T> => {
  try {
    return await promise;
  } catch (error) {
    console.error(error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal server error",
    });
  }
};
export function isTRPCClientError(e: unknown) {
  return e instanceof TRPCError;
}
