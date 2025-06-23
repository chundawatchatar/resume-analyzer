import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { sendToGeminiProxy } from "../services/ai";

const AnalyzeInputSchema = z.object({
  cvText: z.string().nonempty(),
  jdText: z.string().nonempty(),
});

export const analysisRouter = router({
  analyzeCvAndJd: publicProcedure
    .input(AnalyzeInputSchema)
    .mutation(async (opts) => {
      const { input } = opts;
      const response = await sendToGeminiProxy(input);
      return response;
    }),
});
