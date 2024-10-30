import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const signUpFormSchema = z.object({
    name: z.string().min(2, 'Enter a valid name').max(256),
    email: z.string().email(),
    password: z.string().min(8, 'Password requires 8 characters').max(256, 'Characters limit exceeded')
});

export const signInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password requires 8 characters').max(256, 'Characters limit exceeded')
});

