import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.input(z.string().nullish()).query(({ input }) => {
    return `Hello ${input ?? "World"}!`;
  }),
});

export type AppRouter = typeof appRouter;
