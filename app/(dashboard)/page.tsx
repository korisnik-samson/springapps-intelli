import React from 'react'
import { getCurrentUser } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export default async function Home() {
    const user = await getCurrentUser();
    
    if (!user) redirect("/sign-in")
    
    return (
        <div>
            This is the home page
        </div>
    );
}
