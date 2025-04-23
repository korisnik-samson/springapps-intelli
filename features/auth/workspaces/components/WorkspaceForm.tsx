"use client";

import React from 'react'

import { WorkspaceFormProps } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspaceSchema } from "@/features/auth/workspaces/schemas";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DottedSeparator } from "@/components/DottedSeparator";

export const WorkspaceForm = ({ onCancel }: WorkspaceFormProps) => {
    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: { name: ""},
    });
    
    const onSubmit = async (data: z.infer<typeof createWorkspaceSchema>) => {
        console.log({ data });
    }
    
    return (
        <Card className="w-full h-full border-none shadow-lg">
            <CardHeader className='flex p-7'>
                <CardTitle className='text-xl font-bold'>Create a new Project workspace</CardTitle>
            </CardHeader>
            
            <div className='px-7'>
                <DottedSeparator />
            </div>
            
            <CardContent className='p-7'>
                
            </CardContent>
        </Card>
    );
}