'use client';

import React from 'react'
import { useGetWorkspaces } from "@/features/auth/workspaces/api/use-get-workspaces";

const WorkspaceSwitcher = () => {
    const { data } = useGetWorkspaces();
    
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
}

export default WorkspaceSwitcher;