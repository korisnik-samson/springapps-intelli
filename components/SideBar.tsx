import React from 'react'

import Link from "next/link";
import Image from "next/image";
import { DottedSeparator } from "@/components/DottedSeparator";
import { Navigation } from "@/components/Navigation";

export const SideBar = () => {
    return (
        <aside className="h-full bg-neutral-200 p-4 w-full">
            <Link href='/'>
                <Image src="/logo-white.svg" alt="Logo" width={150} height={38} />
            </Link>
            
            <DottedSeparator className="my-4" />
            
            <Navigation />
        </aside>
    );
}