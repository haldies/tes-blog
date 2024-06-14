"use client"

import { useState } from "react"
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
import { registerUser } from "@/lib/authAction"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
    password: passwordSchema,
    confirmPassword: z.string().min(8, { message: "Konfirmasi kata sandi harus memiliki setidaknya 8 karakter." }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi dan konfirmasi kata sandi tidak cocok.",
    path: ["confirmPassword"],
})

export function FormRegister({ setData }) {
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (values) => {
        setLoading(true)
        const { confirmPassword, ...user } = values;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
                },
                body: JSON.stringify(user),
            })

            const response = await res.json()

            const newUser = response.user
            const responseError = response.error

            setResult(responseError)

            if (res.ok) {
                toast({
                    title: "Akun berhasil dibuat."
                })
                setOpen(false);
                setData(prevData => [...prevData, newUser]);
            }
            setLoading(false)

        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(true)}>New</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Buat Akun</AlertDialogTitle>
                    <AlertDialogDescription>Isi formulir di bawah ini untuk membuat akun baru.</AlertDialogDescription>
                    <AlertDialogDescription className="text-red-500  font-bold">{result}</AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 text-start">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Pengguna</FormLabel>
                                    <FormControl>
                                        <Input placeholder="nama pengguna" {...field} />
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Konfirmasi Kata Sandi</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="konfirmasi kata sandi" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end space-x-2">
                            <AlertDialogCancel asChild>
                                <Button variant="outline">Cancel</Button>
                            </AlertDialogCancel>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Loading..." : "Buat Akun"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    )
}
