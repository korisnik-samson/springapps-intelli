"use client";

import React, { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { SideBar } from "@/components/SideBar";
import { usePathname } from "next/navigation";

export const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname = usePathname();
    
    useEffect(() => {
        setIsOpen(false);
        
    }, [pathname]);
    
    return (
        <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="secondary" className="lg:hidden">
                    <MenuIcon className="size-5 text-neutral-500" />
                </Button>
            </SheetTrigger>
            
            <SheetContent side="left" className="p-0">
                <SideBar />
            </SheetContent>
        </Sheet>
    );
};