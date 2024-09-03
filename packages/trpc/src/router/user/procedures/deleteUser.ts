import { TRPCError } from "@trpc/server";

import { protectedProcedure } from "../../../trpc";

export const deleteUserProcedure = protectedProcedure.mutation(
  async ({ ctx }) => {
    try {
      await ctx.clerk.users.deleteUser(ctx.userId);
      return true;
    } catch {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }
  },
);
