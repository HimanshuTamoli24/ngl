"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import * as  z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from "usehooks-ts"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signInSchema } from "@/schemas/signinSchema"
import axios, { AxiosError } from "axios"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@react-email/components"

function Signin() {
    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const debouncedUsername = useDebounceCallback(setUsername, 300);

    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            password: '',
            email: '',
        },
    })

    useEffect(() => {
        const checkUsername = async () => {
            if (debouncedUsername) {
                setIsCheckingUsername(true);
                setUsernameMessage('');
                try {
                    const res = await axios.get(`/api/unique-username?username=${debouncedUsername}`);
                    setUsernameMessage(res.data.message);
                    setUsername(res.data.username);
                } catch (error) {
                    if (error instanceof AxiosError) {
                        setUsernameMessage(error.response?.data.message || "An error occurred");
                    } else {
                        setUsernameMessage("An error occurred");
                    }
                } finally {
                    setIsCheckingUsername(false);
                }
            }
        }
        checkUsername();
    }, [debouncedUsername])

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setIsSubmitting(true);
        try {
            const res = await axios.post('/api/signin', data);
            console.log(res.data);

            toast.success(res.data.message);
            router.replace(`/verify/${username}`);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message || "An error occurred");
            } else {
                toast.error("An error occurred");
            }
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Welcome Back to True Feedback
                    </h1>
                    <p className="mb-4">Sign in to continue your secret conversations</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className='w-full' type="submit">Sign In</Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p>
                        Not a member yet?{' '}
                        <Link href="/signup" className="text-blue-600 hover:text-blue-800">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signin 