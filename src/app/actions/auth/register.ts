'use server'

import { z } from 'zod'
import { getSupabaseServer } from '@/lib/supabase/server'

const registerSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
})

type RegisterState = { error: string } | { success: true }

export async function registerAction(
    prevState: RegisterState,
    formData: FormData
): Promise<RegisterState> {
    const parsed = registerSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    })

    if (!parsed.success) {
        return { error: parsed.error.errors[0].message }
    }

    const { email, password } = parsed.data
    const supabase = getSupabaseServer()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
        },
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}
