import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const blogPostRouter = createTRPCRouter({

  listAll: publicProcedure
    .query(async ({ ctx }) => {
      const blogPost = await ctx.db.blogPost.findMany({
        include: {
          createdBy: true
        },
      });

      return blogPost.map(bp => ({
        id: bp.id,
        title: bp.title,
        synopsis: bp.synopsis,
        createdAt: bp.createdAt,
        createdBy: {
          id: bp.createdBy.id,
          name: bp.createdBy.name,
          email: bp.createdBy.email,
        },
      })) ?? [];
    }),

  getDetail: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const blogPost = await ctx.db.blogPost.findFirst({
        where: { id: input.id },
        include: {
          createdBy: true
        },
      });

      return blogPost;
    }),

  createOrUpdate: protectedProcedure
    .input(z.object({ title: z.string().min(1), content: z.string().min(1), id: z.string().optional(), synopsis: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        await ctx.db.blogPost.update({
          where: { id: input.id },
          data: {
            title: input.title,
            synopsis: input.synopsis,
            content: input.content,
            updatedAt: new Date(),
          },
        });
      } else {
        await ctx.db.blogPost.create({
          data: {
            title: input.title,
            synopsis: input.synopsis,
            content: input.content,
            createdBy: { connect: { id: ctx.session.user.id } },
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }
      return true;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.blogPost.delete({
        where: { id: input.id },
      });
    }),

  debugDeletaAll: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.blogPost.deleteMany();
    return true;
  }),
});
