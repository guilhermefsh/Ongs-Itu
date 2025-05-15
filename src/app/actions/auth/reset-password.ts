'use server'

import { z } from 'zod'
import { getSupabaseServer } from '@/lib/supabase/server'

const resetPasswordSchema = z.object({
    email: z.string().email('Email inválido'),
})

type ResetPasswordState = { error: string } | { success: true }

export async function resetPasswordAction(
    prevState: ResetPasswordState,
    formData: FormData
): Promise<ResetPasswordState> {
    const parsed = resetPasswordSchema.safeParse({
        email: formData.get('email'),
    })

    if (!parsed.success) {
        return { error: parsed.error.errors[0].message }
    }

    const { email } = parsed.data
    const supabase = getSupabaseServer()

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/atualizar-senha`,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
} 