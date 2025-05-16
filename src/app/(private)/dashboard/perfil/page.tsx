"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { User } from "@supabase/supabase-js"
import { Loader2 } from "lucide-react"

import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageUpload } from "@/components/ui/image-upload"

const profileFormSchema = z.object({
    nome: z.string().min(2, {
        message: "O nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor, insira um email válido.",
    }),
    avatar_url: z.string().optional(),
})

const passwordFormSchema = z
    .object({
        senha_atual: z.string().min(6, {
            message: "A senha deve ter pelo menos 6 caracteres.",
        }),
        nova_senha: z.string().min(6, {
            message: "A senha deve ter pelo menos 6 caracteres.",
        }),
        confirmar_senha: z.string().min(6, {
            message: "A senha deve ter pelo menos 6 caracteres.",
        }),
    })
    .refine((data) => data.nova_senha === data.confirmar_senha, {
        message: "As senhas não coincidem.",
        path: ["confirmar_senha"],
    })

type ProfileFormValues = z.infer<typeof profileFormSchema>
type PasswordFormValues = z.infer<typeof passwordFormSchema>

export default function PerfilPage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const supabase = getSupabaseClient()

    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            nome: "",
            email: "",
            avatar_url: "",
        },
    })

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            senha_atual: "",
            nova_senha: "",
            confirmar_senha: "",
        },
    })

    useEffect(() => {
        async function fetchUserAndProfile() {
            try {
                const {
                    data: { user },
                } = await supabase.auth.getUser()

                if (!user) {
                    router.push("/auth/login")
                    return
                }

                setUser(user)

                const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

                if (error) {
                    console.error("Erro ao buscar perfil:", error)
                    toast({
                        title: "Erro",
                        description: "Não foi possível carregar seu perfil.",
                        variant: "destructive",
                    })
                } else {
                    setProfile(profile)
                    profileForm.reset({
                        nome: profile.nome || "",
                        email: user.email || "",
                        avatar_url: profile.avatar_url || "",
                    })
                }
            } catch (error) {
                console.error("Erro:", error)
                toast({
                    title: "Erro",
                    description: "Ocorreu um erro ao carregar seus dados.",
                    variant: "destructive",
                })
            } finally {
                setLoading(false)
            }
        }

        fetchUserAndProfile()
    }, [router, supabase])

    async function onSubmitProfile(data: ProfileFormValues) {
        setIsSaving(true)
        try {
            const { error: profileError } = await supabase
                .from("profiles")
                .update({
                    nome: data.nome,
                    avatar_url: data.avatar_url,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", user?.id)

            if (profileError) throw profileError

            if (user?.email !== data.email) {
                const { error: emailError } = await supabase.auth.updateUser({
                    email: data.email,
                })

                if (emailError) throw emailError

                toast({
                    title: "Email atualizado",
                    description: "Um link de confirmação foi enviado para o novo email.",
                })
            }

            toast({
                title: "Perfil atualizado",
                description: "Suas informações foram atualizadas com sucesso.",
            })

            router.refresh()
        } catch (error: any) {
            console.error("Erro ao atualizar perfil:", error)
            toast({
                title: "Erro",
                description: error.message || "Não foi possível atualizar seu perfil.",
                variant: "destructive",
            })
        } finally {
            setIsSaving(false)
        }
    }

    async function onSubmitPassword(data: PasswordFormValues) {
        setIsChangingPassword(true)
        try {
            const { error } = await supabase.auth.updateUser({
                password: data.nova_senha,
            })

            if (error) throw error

            toast({
                title: "Senha alterada",
                description: "Sua senha foi alterada com sucesso.",
            })

            passwordForm.reset()
        } catch (error: any) {
            console.error("Erro ao alterar senha:", error)
            toast({
                title: "Erro",
                description: error.message || "Não foi possível alterar sua senha.",
                variant: "destructive",
            })
        } finally {
            setIsChangingPassword(false)
        }
    }

    const handleAvatarUpload = async (file: File) => {
        try {
            if (!user) return null

            const fileExt = file.name.split(".").pop()
            const fileName = `${user.id}-${Date.now()}.${fileExt}`
            const filePath = `avatars/${fileName}`

            const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file)

            if (uploadError) throw uploadError

            const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)

            return data.publicUrl
        } catch (error) {
            console.error("Erro ao fazer upload do avatar:", error)
            toast({
                title: "Erro",
                description: "Não foi possível fazer o upload da imagem.",
                variant: "destructive",
            })
            return null
        }
    }

    if (loading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>

            <Tabs defaultValue="informacoes" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="informacoes">Informações Pessoais</TabsTrigger>
                    <TabsTrigger value="senha">Alterar Senha</TabsTrigger>
                </TabsList>

                <TabsContent value="informacoes">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações Pessoais</CardTitle>
                            <CardDescription>Atualize suas informações pessoais e seu avatar.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...profileForm}>
                                <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex flex-col items-center space-y-4">
                                            <Avatar className="h-32 w-32">
                                                <AvatarImage src={profileForm.watch("avatar_url") || ""} alt={profileForm.watch("nome")} />
                                                <AvatarFallback className="text-2xl">
                                                    {profileForm.watch("nome")?.charAt(0)?.toUpperCase() || "U"}
                                                </AvatarFallback>
                                            </Avatar>

                                            <FormField
                                                control={profileForm.control}
                                                name="avatar_url"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <ImageUpload
                                                                value={field.value || ""}
                                                                onChange={field.onChange}
                                                                onUpload={handleAvatarUpload}
                                                                buttonText="Alterar Avatar"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <FormField
                                                control={profileForm.control}
                                                name="nome"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nome</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Seu nome" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={profileForm.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="seu.email@exemplo.com" {...field} />
                                                        </FormControl>
                                                        <FormDescription>
                                                            Ao alterar seu email, você receberá um link de confirmação.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" disabled={isSaving} className="w-full md:w-auto">
                                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isSaving ? "Salvando..." : "Salvar Alterações"}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="senha">
                    <Card>
                        <CardHeader>
                            <CardTitle>Alterar Senha</CardTitle>
                            <CardDescription>Altere sua senha de acesso à plataforma.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...passwordForm}>
                                <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4">
                                    <FormField
                                        control={passwordForm.control}
                                        name="senha_atual"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Senha Atual</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={passwordForm.control}
                                        name="nova_senha"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nova Senha</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={passwordForm.control}
                                        name="confirmar_senha"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirmar Nova Senha</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" disabled={isChangingPassword} className="w-full md:w-auto">
                                        {isChangingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isChangingPassword ? "Alterando..." : "Alterar Senha"}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
