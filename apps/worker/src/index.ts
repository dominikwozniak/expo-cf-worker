import { sentry } from "@hono/sentry";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import type { Env } from "@acme/trpc/env";
import { appRouter, createContext } from "@acme/trpc";

const app = new Hono<{ Bindings: Env }>();

app.use("*", sentry());
app.use(
  "*",
  cors({
    // origin: (origin, c) => "*",
    origin: "*", // TODO: specify if needed
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["*"],
    credentials: true,
  }),
);

app.get("/", (c) => {
  return c.text("App is running! 🚀");
});

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: async (opts, c) => {
      return await createContext(c.env as Env, opts);
      // TODO: check if await is needed
      // return await createContext(c.env.DB, opts);
    },
    onError({ error, path }) {
      // TODO: add logging
      console.error(`>>> tRPC Error on '${path}'`, error);
    },
  }),
);

app.onError((error, c) => {
  c.get("sentry").captureException(error);
  return c.text("Internal Server Error", 500);
});

export default app;
