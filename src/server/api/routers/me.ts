import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const hasPermissionToProjectSchema = z.object({
  projectId: z.string(),
});

export const meRouter = createTRPCRouter({
  getProjects: protectedProcedure.query(async ({ ctx }) => {
    try {
      const loggedInUser = await ctx.prisma.user.findFirst({
        where: {
          id: ctx.session.user?.id,
        },
        include: {
          projects: {
            select: {
              project: {
                select: {
                  id: true,
                  name: true,
                  createdAt: true,
                  createdBy: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const projects = loggedInUser?.projects.map((projectItem) => {
        const project = projectItem.project;
        return {
          id: project.id,
          name: project.name,
          createdBy: project.createdBy.name,
          createdAt: project.createdAt.toLocaleDateString(),
        };
      });

      return projects;
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: (error as Error).message,
        cause: error,
      });
    }
  }),
  hasPermissionToProject: protectedProcedure
    .input(hasPermissionToProjectSchema)
    .query(async ({ ctx, input }) => {
      try {
        const userOnProject = await ctx.prisma.usersOnProjects.findFirst({
          where: {
            userId: ctx.session.user?.id,
            projectId: input.projectId,
          },
        });
        // not found
        if (!userOnProject) {
          return false;
        }
        return true;
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: (error as Error).message,
          cause: error,
        });
      }
    }),
});
