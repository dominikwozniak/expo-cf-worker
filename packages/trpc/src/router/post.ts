import type { TRPCRouterRecord } from "@trpc/server";

import { publicProcedure } from "../trpc";

export const postRouter = {
  test: publicProcedure.query(({ ctx }) => {
    console.log("Hello World!");

    return `Hello World! ${ctx.userId}`;
  }),
} satisfies TRPCRouterRecord;
