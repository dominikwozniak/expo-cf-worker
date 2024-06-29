import type { TRPCRouterRecord } from "@trpc/server";

import { publicProcedure } from "../trpc";

export const postRouter = {
  test: publicProcedure.query(() => {
    console.log('Hello World!')

    return `Hello World!`;
  }),
} satisfies TRPCRouterRecord;
