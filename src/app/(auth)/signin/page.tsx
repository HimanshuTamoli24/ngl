"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form"
import { Input } from "@/components/retroui/Input"
import { Button } from "@/components/retroui/Button"
import { signInSchema } from "@/schemas/signinSchema"
import { signIn } from "next-auth/react"

function Signin() {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        const results = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        })

        if (results?.error) {
            toast.error(results.error)
        } else {
            toast.success("Successfully signed in!")
            router.replace("/dashboard")
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-white px-4">
            {/* Card */}
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg border-2  shadow-lg">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold  tracking-widest mb-4 drop-shadow-[0_0px_5px_yellow]">
                        Join Askly
                    </h1>
                    <p className="text-black text-sm md:text-base">
                        Sign in to continue your secret conversations
                    </p>
                </div>

                {/* Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* Email */}
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" font-bold">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={form.formState.isSubmitting}
                                            className="bg-yellow-50 text-black border-2placeholder-yellow-600"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className=" font-bold">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            disabled={form.formState.isSubmitting}
                                            className="bg-yellow-50 text-black border-2placeholder-yellow-600"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full flex justify-center items-center gap-2 bg-yellow-400 text-black  border-2  hover:bg-yellow-300"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </Form>

                {/* Footer */}
                <div className="text-center mt-4">
                    <p className="text-black text-sm">
                        Don’t have an account?{" "}
                        <Link
                            href="/signup"
                            className=" text-blue-500 underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signin
