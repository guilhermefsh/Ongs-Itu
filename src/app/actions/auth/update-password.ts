'use server'

import { z } from 'zod'
import { getSupabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const updatePasswordSchema = z.object({
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
})

type UpdatePasswordState = { error: string } | { success: true }

export async function updatePasswordAction(
    prevState: UpdatePasswordState,
    formData: FormData
): Promise<UpdatePasswordState> {
    const parsed = updatePasswordSchema.safeParse({
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    })

    if (!parsed.success) {
        return { error: parsed.error.errors[0].message }
    }

    const { password } = parsed.data
    const supabase = getSupabaseServer()

    const { error } = await supabase.auth.updateUser({
        password,
    })

    if (error) {
        return { error: error.message }
    }

    redirect('/dashboard')
} 