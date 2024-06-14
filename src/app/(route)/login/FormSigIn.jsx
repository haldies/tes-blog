"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"



import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



const passwordSchema = z
    .string();

const formSchema = z.object({
    email: z.string().email({
        message: "Email harus berupa alamat email yang valid.",
    }),
    password: passwordSchema,
})

export function FormLogin() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()

    const [info, setInfo] = useState(null)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values) => {
        setIsSubmitting(true);
        const result = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        })
        if(!result.ok){
            setInfo(result.error)
            setIsSubmitting(false);
            return
        }
        router.push("/dashboard")
    }
    

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {info && <div className="text-red-500">{info}</div>}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="example@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kata Sandi</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="kata sandi" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit" disabled={isSubmitting}> {isSubmitting ? "Logging in..." : "Login"}</Button>
            </form>
        </Form>
    )
}
