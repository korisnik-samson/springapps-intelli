import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/DottedSeparator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

export const SignUpCard = () => {

    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const handleSubmit = (values: z.infer<typeof signUpFormSchema>) => {
        console.log({ values });
    }

    return (
        <Card className="w-full h-full md:w-[487px] md:h-[500px] border-none shadow-none">
            <CardHeader className='flex items-center justify-center text-center p-7'>
                <CardTitle className='text-2xl'>Sign Up</CardTitle>

                <CardDescription>
                    By singing up, you agree to our {' '}
                    <Link href='/privacy'>
                        <span className='text-blue-700'>Privacy Policy</span>
                    </Link>{' '}
                    and {' '}
                    <Link href='/terms'>
                        <span className='text-blue-700'>Terms of Service</span>
                    </Link>
                </CardDescription>
            </CardHeader>

            <div className='px-7'>
                <DottedSeparator />
            </div>

            <CardContent className='p-7'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
                        <FormField name='name' control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type='name' placeholder='Enter your name' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

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
                            Register
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
        </Card>
    );
}