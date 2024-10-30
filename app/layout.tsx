import React from "react";
import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { NextFont } from "next/dist/compiled/@next/font";
import { cn } from "@/lib/utils";

const inter: NextFont = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: "Intelli",
    description: "SpringApps Project Management Tool",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={cn('min-h-screen antialiased', inter.className)}>
                {children}
            </body>
        </html>
    );
}
