import React from 'react';

export interface AuthLayoutProps {
    children: React.ReactNode;
}

export interface DottedSeparatorProps {
    className?: string;
    color?: string;
    height?: string;
    dotSize?: string;
    gapSize?: string;
    direction?: 'horizontal' | 'vertical';
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export type RegisterCredentials = {
    name: string;
    username: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    success: boolean;
    message?: string;
}

export type RegisterResponse = {
    success: boolean;
    message?: string;
}

export type ContextType = {
    Variables: {
        JWT_Token: string;
    };
}