import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/DottedSeparator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft, FaGithub } from "react-icons/fa";
import { signInFormSchema } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

export const SignInCard = () => {

    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const handleSubmit = (values: z.infer<typeof signInFormSchema>) => {
        console.log({ values });

        // TODO: Implement login logic - finish with Spring Backend
    }

    return (
        <Card className="w-full h-full md:w-[487px] md:h-[500px] border-none shadow-none">
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
        </Card>
    );
}