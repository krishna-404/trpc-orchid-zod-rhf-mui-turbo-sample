import { initTRPC } from '@trpc/server';
import { Context } from './router';

const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const router = t.router;