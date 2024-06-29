import * as jose from "jose";

import type { Env } from "../env";

export const decodeUserId = async (env: Env, authToken: string) => {
  try {
    const publicKey = await jose.importSPKI(env.CLERK_PEM_KEY, "RS256");
    const { payload } = await jose.jwtVerify(authToken, publicKey);
    return payload.sub;
  } catch (error) {
    // TODO: add logger
    console.error(">>> clerk error: ", error);
    return null;
  }
};
