import { router, publicProcedure } from "./init";
import { z } from "zod";

/**
 * Example tRPC router
 * Add your routes here
 */
export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name}!`,
      };
    }),
});

export type AppRouter = typeof appRouter;

