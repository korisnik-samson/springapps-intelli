import { Hono } from 'hono';
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "@/lib/utils";
import { userLogin, userRegister } from "@/lib/spring";
import { RegisterResponse } from "@/types";

const app = new Hono().post(
    '/login',
    // middleware to validate the request body
    zValidator('json', loginSchema),

    async (context) => {
        const { email, password } = context.req.valid('json');
        // console.log({ email, password });
        
        const loginData = await userLogin({
            username: email, 
            password: password 
        });
        
        if (!loginData.success) return context.json({ message: loginData.message }, 401);

        console.log({ loginData });

        return context.json({ 
            message: 'Login successful', 
            token: loginData?.token
        });
    }
).post(
    '/register',
        // middleware to validate the request body
        zValidator('json', registerSchema),

        async (context) => {
            const { name, email, password } = context.req.valid('json');
            console.log({ name, email, password });
            
            const registerData: RegisterResponse = await userRegister({
                name: name,
                username: email, 
                password: password 
            });
            
            if (!registerData.success) return context.json({ message: registerData.message }, 400);

            console.log({ registerData });

            return context.json({ message: 'Registration successful' });
        }
    );

export default app;