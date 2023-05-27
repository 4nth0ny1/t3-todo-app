import { protectedProcedure, createTRPCRouter } from "../trpc";
import { todoInput } from "~/types"

export const todoRouter = createTRPCRouter({
    all: protectedProcedure.query( async ({ctx}) => {
        const todos = await ctx.prisma.todo.findMany({
            where: {
                userId: ctx.session.user.id,
            }
        })
        console.log(todos.map(({id, content}) => {
            ({id, content})
        }))
    
        return [
            {
                id: 'fake',
                content: 'fake text',
             
            }, 
            {
                id: 'fake2',
                content: 'fake2 text',
                
            }
        ]
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
    })
})