import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import auth from '@/features/auth/server/route';
import users from "@/features/auth/server/users";

const app = new Hono().basePath('/api');

const routes = app
    .route('/auth', auth)
    .route('/users', users);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;