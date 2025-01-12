import { Hono } from 'hono';
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "@/lib/utils";

const app = new Hono().post(
    '/auth/login',

    // middleware to validate the request body
    zValidator('json', loginSchema),

    (context) => {
        return context.json({ message: 'Login successful' });
    });

export default app;