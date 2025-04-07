import { createMiddleware } from "hono/factory";
import { getCookie, setCookie } from "hono/cookie";
import { verify, decode } from "hono/jwt";
import { JwtVariables } from "hono/jwt";

export const sessionMiddleware = createMiddleware(
    async (context, next) => {
        const token = getCookie(context, 'JWT_Token');

        // if (!token) return context.json({ message: 'Unauthorized' }, 401);
        
        if (!token) {
            // Clear session info from response headers
            context.header('X-Session-User', '');
            
            return await next();
        }
        
        // Verify the JWT token
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT secret not found');
    }
);