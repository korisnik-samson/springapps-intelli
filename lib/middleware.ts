import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { getUserFromUsername } from "@/lib/spring";
import { verify } from "jsonwebtoken";
//import { verify } from "hono/jwt"
import { isJWTValid } from "@/lib/utils";
import { getSecret } from "@/lib/azure-secrets";
import { KeyVaultSecret } from "@azure/keyvault-secrets";

export const sessionMiddleware = createMiddleware(
    async (context, next) => {
        const token = getCookie(context, 'JWT_Token');
        if (!token) return context.json({ message: 'No token provided' }, 401);

        // obtain the JWT token from Azure Key Vault
        const jwtSecret: KeyVaultSecret = await getSecret(process.env.JWT_SECRET_NAME!);
        console.log({ jwtSecret });

        if (!jwtSecret.value) {
            console.error(`Secret ${process.env.JWT_SECRET_NAME} retrieved but has no value.`);
            return context.json({ message: 'Internal server configuration error' }, 500);
        }
        
        // TODO: Resolve the secret from Azure Key Vault being in sync with the JWT token
        
        //Verify the JWT token
        const  decodedToken = verify(
            token, 
            Buffer.from(jwtSecret!.value, 'base64'), {
            algorithms: ['HS256']
        });
        
        if (isJWTValid(decodedToken)) return context.json({ message: 'Invalid or expired token' }, 401);

        const user = await getUserFromUsername(decodedToken.sub, token);
        if (!user) return context.json({ message: 'User not found' }, 404);

        context.set('user', user);

        await next();
    }
);