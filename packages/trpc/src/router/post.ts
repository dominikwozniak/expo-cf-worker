import type { TRPCRouterRecord } from "@trpc/server";

import { publicProcedure } from "../trpc";

export const postRouter = {
  test: publicProcedure.query(() => {
    return `Hello World!`;
  }),
} satisfies TRPCRouterRecord;
