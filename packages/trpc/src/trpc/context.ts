import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { createClerkClient } from "@clerk/backend";

// import jwt from "jsonwebtoken";

import { dbClient } from "@acme/database";
import type { Env } from "../env";

export const createContext = async (
  env: Env,
  { req }: FetchCreateContextFnOptions,
) => {
  const d1 = env.DB;
  const db = dbClient(d1);

  const clerk = createClerkClient({
    secretKey: env.CLERK_SECRET_KEY,
  });

  const language = req.headers.get("content-language") ?? "en";
  // TODO: use in monitoring and logging
  const source = req.headers.get("x-trpc-source") ?? "unknown";
  console.log(">>> tRPC Request from", source);

  const authToken = req.headers.get("x-clerk-auth-token");
  const sessionId = req.headers.get("x-clerk-auth-session-id");

  console.log(">>> tRPC Request with authToken: ", authToken);
  console.log(">>> tRPC Request with session: ", sessionId);

  console.log("clerk PEM >>>", env.CLERK_PEM_KEY);

  if (authToken) {
    try {
      // const decoded = jwt.verify(authToken, env.CLERK_PEM_KEY);
      // console.log(">>> clerk decoded: ", decoded);
    } catch (error) {
      console.error(">>> clerk error: ", error);
    }
  }

  if (sessionId) {
    console.log(
      ">>> clerk session: ",
      await clerk.sessions.getSession(sessionId),
    );
  }

  return {
    db,
    language,
    userId:
      sessionId && authToken
        ? await clerk.sessions.getSession(sessionId)
        : null,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
