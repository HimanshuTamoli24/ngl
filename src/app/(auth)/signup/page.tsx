"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from "usehooks-ts"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import axios, { AxiosError } from "axios"

import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form"
import { Input } from "@/components/retroui/Input"
import { Button } from "@/components/retroui/Button"
import { signupSchema } from "@/schemas/signupSchema"

function Signup() {
    const [username, setUsername] = useState("")
    const [usernameMessage, setUsernameMessage] = useState("")
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const debouncedUsername = useDebounceCallback(setUsername, 300)

    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
        },
    })

    useEffect(() => {
        const checkUsername = async () => {
            const trimmed = username.trim()

            // if empty or too short, reset and skip API
            if (trimmed.length < 3) {
                setUsernameMessage("")
                return
            }
            
            if (username.length) {
                setIsCheckingUsername(true)
                setUsernameMessage("")
                try {
                    const res = await axios.get(`/api/unique-username?username=${username}`)

                    setUsernameMessage(res.data.message)
                } catch (error) {
                    if (error instanceof AxiosError) {
                        setUsernameMessage(error.response?.data.message || "An error occurred")
                    } else {
                        setUsernameMessage("An error occurred")
                    }
                } finally {
                    setIsCheckingUsername(false)
                }
            }
        }
        checkUsername()
    }, [username])

    const onSubmit = async (data: z.infer<typeof signupSchema>) => {
        setIsSubmitting(true)
        try {
            const res = await axios.post("/api/signup", data)
            toast.success(res.data.message)
            router.replace(`/verify/${username}`)
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message || "An error occurred")
            } else {
                toast.error("An error occurred")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="sm:w-full w-fit border  p-2.5  max-w-md sm:p-5 space-y-8  rounded-lg shadow-md">
                <div className="text-center pt-3 " >
                    <h1 className="sm:text-4xl text-3xl font-extrabold tracking-tight lg:text-5xl mb-6 capitalize">join Askly</h1>
                    <p className="mb-2">Sign up to continue your secret conversations</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Username Field */}
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e)
                                                debouncedUsername(e.target.value)
                                            }}
                                        />
                                    </FormControl>
                                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                                    {!isCheckingUsername && usernameMessage && (
                                        <p
                                            className={`text-sm ${usernameMessage === "Username is available" ? "text-green-500" : "text-red-500"
                                                }`}
                                        >
                                            {usernameMessage}
                                        </p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email Field */}
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <p className="text-gray-400 text-sm">We will send you a verification code</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password Field */}
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full flex justify-center items-center"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Please wait
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>

                    </form>
                </Form>

                <div className="text-center mt-4">
                    <p>
                        Already a member?{" "}
                        <Link href="/signin" className="text-blue-600 hover:text-blue-800">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
