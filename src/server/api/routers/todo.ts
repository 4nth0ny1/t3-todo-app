import { protectedProcedure, createTRPCRouter } from "../trpc";
import { todoInput } from "~/types"
import { z } from 'zod'

export const todoRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
        const todos = await ctx.prisma.todo.findMany({
        where: {
            userId: ctx.session.user.id,
        },
        });
        return todos.map(({ id, content, done }) => ({ id, content, done }));
    }),
    create: protectedProcedure.input(todoInput).mutation(async ({ ctx, input }) => {
        return ctx.prisma.todo.create({
            data: {
                content: input,
                user: {
                    connect: {
                        id: ctx.session.user.id
                    }
                }
            }
        })
    }),
    delete: protectedProcedure.input(z.string()).mutation(({ctx, input}) => {
        return ctx.prisma.todo.delete({
            where: {
                id: input
            }
        })
    }),
    toggle: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, done } = input;
      return ctx.prisma.todo.update({
        where: {
          id,
        },
        data: {
          done,
        },
      });
    }),
})