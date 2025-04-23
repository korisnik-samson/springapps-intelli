import React from 'react'
import { getCurrentUser } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import { WorkspaceForm } from "@/features/auth/workspaces/components/WorkspaceForm";

export default async function Home() {
    const user = await getCurrentUser();
    
    if (!user) redirect("/sign-in")
    
    return (
        <div className='bg-neutral-200 p-4 h-full rounded-2xl'>
            <WorkspaceForm />
        </div>
    );
}
