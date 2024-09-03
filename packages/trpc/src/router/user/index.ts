import type { TRPCRouterRecord } from "@trpc/server";

import { deleteUserProcedure } from "./procedures";

export const userRouter = {
  deleteUser: deleteUserProcedure,
} satisfies TRPCRouterRecord;
