import { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";

import { trpcUrl } from "~/config";
import { api } from "~/utils/api";

export function TRPCProvider(props: { children: React.ReactNode }) {
  const { getToken } = useAuth();

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
          colorMode: "ansi",
        }),
        httpBatchLink({
          transformer: superjson,
          url: `${trpcUrl}/trpc`,
          async headers() {
            const authToken = await getToken();

            const headers = new Map<string, string>();
            headers.set("x-trpc-source", "expo-react");
            headers.set("Content-Language", "en");
            headers.set("x-clerk-auth-token", authToken ?? "");

            return Object.fromEntries(headers);
          },
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
}
