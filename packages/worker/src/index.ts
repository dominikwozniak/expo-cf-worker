import { Hono } from "hono";

/*
 * Define the environment variables that your application will use.
 * Hono disallows the use interface for defining environment variables.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Env = {
  MY_VAR: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => {
  return c.text("Hello Hono! 🚀");
});

export default app;
