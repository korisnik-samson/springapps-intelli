import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";
import { JwtPayload, verify } from "jsonwebtoken";
import { ProjectObject } from "@/types";
import { KeyVaultSecret } from "@azure/keyvault-secrets";
import { getSecret } from "@/lib/azure-secrets";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const registerSchema = z.object({
    name: z.string().min(2, 'Enter a valid name').max(256),
    email: z.string().email(),
    password: z.string().min(8, 'Password requires 8 characters').max(256, 'Characters limit exceeded')
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password requires 8 characters').max(256, 'Characters limit exceeded')
});

export function loginDuration(duration: number): number {
    return Number(60 * 60 * 24 * duration)
}

export function splitString(input: string): { name: string, lastname: string } {
    const [first, ...rest] = input.split(' ');

    const temp: string[] = [first, rest.join(' ')];

    return {
        name: temp[0],
        lastname: temp[1]
    }
}

export function isJWTValid(token: string | JwtPayload): boolean {
    try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        const exp = decodedPayload.exp;

        return Date.now() < exp * 1000;
        
    } catch (error) {
        return false;
    }
}

export function truncateEmail(email: string): string {
    const [username, domain] = email.split('@');
    const truncatedUsername = username.length > 15 ? `${username.slice(0, 15)}...${username.slice(-3)}` : username;
    
    return `${truncatedUsername}@${domain}`;
}

export function filterProjectsByEmail(projects: ProjectObject[], email: string): ProjectObject[] | null {
    return projects.filter(project => project.createdBy === email);
}

export async function extractEmailFromToken(token: string): Promise<string> {
    try {
        const jwtSecret: KeyVaultSecret = await getSecret(process.env.JWT_SECRET_NAME!);
        console.log({ jwtSecret });

        if (!jwtSecret.value) console.error(`Secret ${process.env.JWT_SECRET_NAME} retrieved but has no value.`);

        //Verify the JWT token
        const decodedToken = verify(
            token,
            Buffer.from(jwtSecret!.value as string, 'base64'), {
                algorithms: ['HS256']
            }
        );
        
        if (!isJWTValid(decodedToken)) return 'Invalid or expired token';

        console.log(decodedToken.sub)
        
        return decodedToken.sub as string;
        
    } catch (error) {
        console.error(`Error extracting email from token: ${error}`);
        return 'Error extracting email from token';
    }
}
