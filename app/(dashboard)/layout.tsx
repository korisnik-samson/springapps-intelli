import React from 'react';
import { SideBar } from "@/components/SideBar";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { NextFont } from "next/dist/compiled/@next/font";
import { Inter } from "next/font/google";
const inter: NextFont = Inter({ subsets: ['latin'] })

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className={cn('antialiased min-h-screen', inter.className)}>
            <div className="flex w-full h-full">
                <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
                    <SideBar />
                </div>
                
                <div className="lg:pl-[264px] w-full">
                    <div className="mx-auto max-w-screen-2xl h-full">
                        <Navbar />
                        
                        <main className='h-full py-8 px-6 flex flex-col'>
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;