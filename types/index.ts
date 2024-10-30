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