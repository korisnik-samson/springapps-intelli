import { Hono } from 'hono';
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "@/lib/utils";

const app = new Hono()
.post(
    '/login',

    // middleware to validate the request body
    zValidator('json', loginSchema),

    async (context) => {
        const { email, password } = context.req.valid('json');
        console.log({ email, password });

        return context.json({ message: 'Login successful' });
    }
).post(
    '/register',

        // middleware to validate the request body
        zValidator('json', registerSchema),

        async (context) => {
            const { name, email, password } = context.req.valid('json');
            console.log({ name, email, password });

            return context.json({ message: 'Registration successful' });
        }
    );

export default app;