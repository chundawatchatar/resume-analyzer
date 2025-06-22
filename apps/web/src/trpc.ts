import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "api/src/server";

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_API_URL}/api/trpc`,
    }),
  ],
});
