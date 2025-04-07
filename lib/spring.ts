'use server';

// This file contains the Spring backend API for authentication.

// It is used to handle login and registration requests.

import { LoginCredentials, LoginResponse, RegisterCredentials, RegisterResponse } from "@/types";
import { splitString } from "@/lib/utils";

export async function userLogin(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_SERVICE_URL!}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(credentials),
        })
        
        if (!response.ok) {
            const error = await response.json().catch((_) => {});

            return {
                success: false,
                token: '',
                message: `Login failed wit status${response.status}\n${error?.message || 'Unknown error'}`,
            };
        }
        
        const data = await response.text();
        
        // TODO: Remove the JWT token being visible in the console
        
        return {
            success: true,
            token: data,
        };
        
    } catch (error) {
        console.error(`Login failed: \n${error}`);
        
        return {
            success: false,
            token: '',
            message: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}

export async function userRegister(credentials: RegisterCredentials): Promise<RegisterResponse> {
    const { name, lastname } = splitString(credentials.name);
    
    const newUser = {
        firstName: name,
        lastName: lastname,
        username: credentials.username,
        email: credentials.username,
        password: credentials.password,
    }
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_USER_SERVICE_URL!}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(newUser),
        })
        
        if (!response.ok) {
            const error = await response.json().catch((_) => {});
            
            return {
                success: false,
                message: `Registration failed with status ${response.status}\n${error?.message || 'Unknown error'}`,
            };
        }
        
        return {
            success: true,
            message: 'Registration successful',
        };
        
    } catch (error) {
        console.error(`Registration failed: \n${error}`);
        
        return {
            success: false,
            message: error instanceof Error ? error.message : 'An unknown error occurred',
        };
    }
}