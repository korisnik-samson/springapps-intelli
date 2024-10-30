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
    icons: {
        icon: "/images/favicon.ico",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={cn('antialiased min-h-screen ', inter.className)}>
                {children}
            </body>
        </html>
    );
}
