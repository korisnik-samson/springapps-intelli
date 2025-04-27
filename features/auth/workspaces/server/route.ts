import { Hono } from 'hono';
import { zValidator } from "@hono/zod-validator";
import { createWorkspaceSchema } from "@/features/auth/workspaces/schemas";
import { projectsMiddleware, sessionMiddleware } from "@/lib/middleware";
import { LoginResponse, ProjectObject, ProjectResponse, UserObject } from "@/types";
import { createProject, getProjectDatabase, userLogin } from "@/lib/spring";
import { extractEmailFromToken, filterProjectsByEmail, loginDuration } from "@/lib/utils";
import { getCookie } from "hono/cookie";

const app = new Hono().post('/create', 
    zValidator('json', createWorkspaceSchema), sessionMiddleware, // projectsMiddleware,
    async (context) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const user = context.get('user') as UserObject;
        if (!user) return context.json({ message: 'User not found' }, 401);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        
        const projects = context.get('projects') as ProjectObject[];
        const token = getCookie(context, 'JWT_Token');

        console.log(`Token --> ${token}`);
        
        // geting the provided details from the form
        const { name, description } = context.req.valid('json');

        const projectData: ProjectResponse = await createProject(token!, {
            name: name,
            description: description ?? '',
            createdBy: token ?? '',
        });

        console.log({ projectData });
        console.log(`Project --> ${projectData.project?.createdBy}`);
        
        if (!projectData.success) return context.json({ message: projectData.message }, 400);
        
        // this should return the user with the projects in json format
        return context.json({ 
            message: 'Create workspace successful',
            project: projectData.project,
            user: {
                ...user,
                projects: projects
            }
        });
    }
).get('/', sessionMiddleware,
    async (context) => {

        const token = getCookie(context, 'JWT_Token');
        
        //const projects = context.get('projects') as ProjectObject[];
        
        const projects = await getProjectDatabase() as ProjectObject[];
        if (!projects) return context.json({ message: 'No projects found' }, 404);
        
        const email = await extractEmailFromToken(token!);
        console.log({ email });
        
        if (!email) return context.json({ message: 'No email found' }, 404);
        
        const currentProjects = filterProjectsByEmail(projects, email);
        
        return context.json({ data: currentProjects });
    });

export default app;