'use server';

import { cookies } from "next/headers";
import { KeyVaultSecret } from "@azure/keyvault-secrets";
import { getSecret } from "@/lib/azure-secrets";
import { verify } from "jsonwebtoken";
import { getUserFromUsername } from "@/lib/spring";

export const getCurrentUser = async () => {
    try {
        const token = cookies().get('JWT_Token')?.value;
        if (!token) return null;
        
        // get Secret from Azure Key Vault
        const jwtSecret: KeyVaultSecret = await getSecret(process.env.JWT_SECRET_NAME!);

        if (!jwtSecret.value) { 
            console.error(`Secret ${process.env.JWT_SECRET_NAME} retrieved but has no value.`);
            return null;
        }
        
        // verify and decode the token to get the username and validity
        const decodedToken = verify(
            token,
            Buffer.from(jwtSecret.value, 'base64'), { 
            algorithms: ['HS256']
        });

        const user = getUserFromUsername(decodedToken.sub, token)
        
        if (!user) {
            console.error('User not found');
            return null;
        }
        
        return user;
        
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}
