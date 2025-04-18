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
        // secret key from Azure might be needed too
        // verify and decode the token to get the username and validity
        // if valid then get the user

        // const user = getUserByUsername(username, token)
        // return the user
        
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}
