import { Hono } from "hono";
import { cors } from "hono/cors";

import { dbClient } from "./db/db-client";
import { posts } from "./db/schema";

/*
 * Define the environment variables that your application will use.
 * Hono disallows the use interface for defining environment variables.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Env = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

// app.use("/trpc/*", async (c, next) => {
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

app.get("/", async (c) => {
  const client = dbClient(c.env.DB);

  const res = await client.select().from(posts).all();

  return c.text("Hello Hono! 🚀" + JSON.stringify(res, null, 2));
});

export default app;
