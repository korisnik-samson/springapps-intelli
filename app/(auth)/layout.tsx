import React from 'react'
import { AuthLayoutProps } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <main className='bg-neutral-100 min-h-screen'>
            <div className='mx-auto max-w-screen-2xl p-4'>

                <nav className='flex justify-between items-center'>
                    <Image src='/logo-white.svg' width={152} height={56} alt='Logo' />

                    <Button variant='default'>Sign Up</Button>
                </nav>

                <div className='flex flex-col items-center justify-center pt-4 md:pt-14'>
                    {children}
                </div>
            </div>
        </main>
    );
}

export default AuthLayout;