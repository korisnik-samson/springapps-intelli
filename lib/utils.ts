import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";
import { JwtPayload } from "jsonwebtoken";

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
