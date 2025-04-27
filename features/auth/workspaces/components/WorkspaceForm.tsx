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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateWorkspace } from "@/features/auth/workspaces/api/use-create-workspace";

export const WorkspaceForm = ({ onCancel }: WorkspaceFormProps) => {
    const { mutate, isPending } = useCreateWorkspace();
    
    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: { name: "", description: "", status: "" },
    });
    
    const onSubmit = async (data: z.infer<typeof createWorkspaceSchema>) => {
        console.log({ data });
        mutate(data);
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className=''>
                        <div className='flex flex-col gap-y-4'>
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-semibold'>Workspace Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="Enter workspace name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-semibold'>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Enter workspace description" rows={4} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <DottedSeparator className='py-7' />
                        
                        <div className="flex items-center justify-between">
                            <Button disabled={isPending} variant="secondary" type="submit" size='lg' onClick={onCancel}>Cancel</Button>
                            <Button disabled={isPending} type="submit" size='lg'>Create Workspace</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}