import { Hono } from 'hono';
import { zValidator } from "@hono/zod-validator";
import { createWorkspaceSchema } from "@/features/auth/workspaces/schemas";
import { sessionMiddleware } from "@/lib/middleware";

const app = new Hono().post('/create', zValidator('json', createWorkspaceSchema), sessionMiddleware,
    async (context) => {
        const user = context.get('user');
        const projects = context.get('projects');
        
        const { name } = context.req.valid('json');
        
        console.log({ user, projects });
        
        // this should return the user with the projects in json format
        return context.json({ message: 'Create workspace successful' });
    });

export default app;