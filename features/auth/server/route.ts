import { Hono } from 'hono';
import { zValidator } from "@hono/zod-validator";
import { loginDuration, loginSchema, registerSchema } from "@/lib/utils";
import { userLogin, userRegister } from "@/lib/spring";
import { LoginResponse, RegisterResponse } from "@/types";
import { deleteCookie, setCookie } from "hono/cookie";
import { sessionMiddleware } from "@/lib/middleware";

const app = new Hono().post('/login',
    // middleware to validate the request body
    zValidator('json', loginSchema),

    async (context) => {
        const { email, password } = context.req.valid('json');
        // console.log({ email, password });
        
        const loginData: LoginResponse = await userLogin({
            username: email, 
            password: password 
        });
        
        if (!loginData.success) return context.json({ message: loginData.message }, 401);

        console.log({ loginData });

        // Set the JWT token in cookies
        setCookie(context, 'JWT_Token', loginData.token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: loginDuration(14),
                domain: process.env.NEXT_PUBLIC_USER_SERVICE_URL,
            }
        )

        return context.json({ 
            message: 'Login successful', 
            token: loginData?.token
        });
    }
    
).post('/register',
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
    
).post('/logout', sessionMiddleware,
    async (context) => {
        
        // Clear the JWT token in cookies
        deleteCookie(context, 'JWT_Token');

        return context.json({ message: 'Logout successful' });
    }
    
).get('/current', sessionMiddleware, 
    async (context) => {
        const user = context.get('jwtPayload');
        
        console.log({ user });
    
        return user ? context.json({ user: user }) : context.json({ message: 'No user found' });
    }
);

export default app;