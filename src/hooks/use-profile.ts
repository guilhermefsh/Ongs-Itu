import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { User } from "@supabase/supabase-js"

import { getSupabaseClient } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"

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

export function useProfile() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const supabase = useMemo(() => getSupabaseClient(), [])

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

    const fetchUserAndProfile = useCallback(async () => {
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
    }, [router, supabase, profileForm])

    useEffect(() => {
        fetchUserAndProfile()
    }, [fetchUserAndProfile])

    const handleAvatarUpload = useCallback(async (file: File) => {
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
    }, [user, supabase])

    const onSubmitProfile = useCallback(async (data: ProfileFormValues) => {
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
    }, [user, supabase, router])

    const onSubmitPassword = useCallback(async (data: PasswordFormValues) => {
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
    }, [supabase, passwordForm])

    const profileFormSubmit = useMemo(() => profileForm.handleSubmit(onSubmitProfile), [profileForm, onSubmitProfile])
    const passwordFormSubmit = useMemo(() => passwordForm.handleSubmit(onSubmitPassword), [passwordForm, onSubmitPassword])

    return {
        user,
        profile,
        loading,
        isSaving,
        isChangingPassword,
        profileForm,
        passwordForm,
        handleAvatarUpload,
        onSubmitProfile: profileFormSubmit,
        onSubmitPassword: passwordFormSubmit,
    }
} 