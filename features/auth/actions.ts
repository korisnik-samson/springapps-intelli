'use server';

import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { UserObject } from "@/types";
import { KeyVaultSecret } from "@azure/keyvault-secrets";
import { getSecret } from "@/lib/azure-secrets";

export const getCurrentUser = async () => {
    try {
        const token = cookies().get('JWT_Token')?.value;
        if (!token) return null;

        const jwtSecret: KeyVaultSecret = await getSecret(process.env.JWT_SECRET_NAME!);
        
        const decoded = verify(token, jwtSecret.value!) as UserObject;
        if (!decoded) return null;
        
        return {
            id: decoded.user_id,
            name: decoded.username,
            email: decoded.email,
            role: decoded.role,
        };
        
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}