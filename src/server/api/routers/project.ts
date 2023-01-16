import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const getSiteDiariesSchema = z.object({
  projectId: z.string(),
});

export const projectRouter = createTRPCRouter({
  getSiteDiaries: protectedProcedure
    .input(getSiteDiariesSchema)
    .query(async ({ ctx, input }) => {
      try {
        const project = await ctx.prisma.project.findUniqueOrThrow({
          where: {
            id: input.projectId,
          },
          include: {
            createdBy: {
              select: {
                name: true,
              },
            },
            siteDiaries: {
              include: {
                createdBy: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });
        return {
          siteDiaries: project.siteDiaries.map((siteDiary) => ({
            id: siteDiary.id,
            name: siteDiary.name,
            date: siteDiary.date.toLocaleDateString(),
            createdBy: siteDiary.createdBy.name,
          })),
        };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: (error as Error).message,
          cause: error,
        });
      }
    }),
});
