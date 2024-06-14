"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"

const passwordSchema = z
    .string()
    .min(8, { message: "Kata sandi harus memiliki setidaknya 8 karakter." })
    .regex(/[a-z]/, { message: "Kata sandi harus mengandung setidaknya satu huruf kecil." })
    .regex(/[A-Z]/, { message: "Kata sandi harus mengandung setidaknya satu huruf besar." })
    .regex(/\d/, { message: "Kata sandi harus mengandung setidaknya satu angka." })
    .regex(/[^a-zA-Z0-9]/, { message: "Kata sandi harus mengandung setidaknya satu karakter khusus." })

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Nama pengguna harus memiliki setidaknya 2 karakter.",
    }),
    email: z.string().email({
        message: "Email harus berupa alamat email yang valid.",
    }),
})

export function FormProfil({ params }) {
    const id = params.id

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    })

    const onSubmit = async (values) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
                },
                body: JSON.stringify(values),
            });
            if (!res.ok) {
                throw new Error('Failed to update profile');
            }

            toast({
                title: "Success",
                description: "Profile updated successfully",
                status: "success",
            });

            const data = await res.json();
            return data.post;

        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update profile",
                status: "error",
            });
        }
    }


    useEffect(() => {
        const dataUser = async () => {
            const session = await getSession();
            form.reset({
                name: session.user.name,
                email: session.user.email,
            });
        }

        dataUser();
    }, [form])


    return (
        <div className="container flex justify-center">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full max-w-[400px]">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Pengguna</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nama Pengguna" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" type="submit">Save Profil</Button>
                </form>
            </Form>
        </div>
    )
}

export default FormProfil;
