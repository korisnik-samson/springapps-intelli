import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/DottedSeparator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { loginSchema } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import Link from "next/link";
import { useLogin } from "@/features/auth/api/use-login";

export const SignInCard = () => {
    const { mutate } = useLogin();
    
    const { toast } = useToast();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const handleSubmit = (values: z.infer<typeof loginSchema>) => {
        // TODO: Implement login logic - finish with Spring Backend
        
        toast({
            title: "We're signing you in...",
            description: "Just a sec, we're checking our servers.",
        })
        
        mutate(values);
    }

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className='flex items-center justify-center text-center p-7'>
                <CardTitle className='text-2xl'>Welcome back!</CardTitle>
            </CardHeader>

            <div className='px-7'>
                <DottedSeparator />
            </div>

            <CardContent className='p-7'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                        <FormField name='email' control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type='email' placeholder='Enter email address' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField name='password' control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type='password' placeholder='Enter password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <Button disabled={false} type='submit' variant='default' className='w-full'>
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>

            <div className='px-7'>
                <DottedSeparator />
            </div>

            <CardContent className='p-7 flex flex-col gap-y-4'>
                <Button variant='secondary' size='default' className='w-full' disabled={false}>
                    <div className='flex items-center justify-center gap-1'>
                        <FcGoogle className='mr-2 size-7' />
                        Login with Google
                    </div>
                </Button>

                <Button variant='secondary' size='default' className='w-full' disabled={false}>
                    <div className='flex items-center justify-center gap-1'>
                        <FaGithub className='mr-2 size-5' />
                        Login with GitHub
                    </div>
                </Button>
            </CardContent>

            <div className='px-7'>
                <DottedSeparator />
            </div>

            <CardContent className='p-7 flex items-center justify-center'>
                <p>
                    Don&apos;t have an account?
                    <Link href='/sign-up'>
                        <span className='text-blue-700 cursor-pointer ml-1'>&nbsp;Sign Up</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
}