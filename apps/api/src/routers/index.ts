import { router } from "../trpc";

import { analysisRouter } from "./analysis";

export const appRouter = router({
  analysis: analysisRouter,
});
