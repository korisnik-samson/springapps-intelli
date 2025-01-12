'use client';

import React from 'react'
import { AuthLayoutProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const AuthLayout = ({ children }: AuthLayoutProps) => {
    const pathname = usePathname();
    const isSignIn = pathname === '/sign-in';

    return (
        <main className='bg-neutral-100 min-h-screen'>
            <div className='mx-auto max-w-screen-2xl p-4'>

                <nav className='flex justify-between items-center'>
                    <Image src='/logo-white.svg' width={152} height={56} alt='Logo' />

                    <Button asChild variant='default'>
                        <Link href={isSignIn ? '/sign-up' : '/sign-in'}>
                            {pathname === '/sign-in' ? 'Sign Up' : "Login"}
                        </Link>
                    </Button>
                </nav>

                <div className='flex flex-col items-center justify-center pt-4 md:pt-14'>
                    {children}
                </div>
            </div>
        </main>
    );
}

export default AuthLayout;