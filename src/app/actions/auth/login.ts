'use server'

import { z } from 'zod'
import { getSupabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export async function loginAction(
    prevState: { error: string, success: boolean },
    formData: FormData
): Promise<{ error: string; success: boolean }> {
    const parsed = schema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!parsed.success) {
        return { error: 'Email ou senha inválidos.', success: false }
    }

    const { email, password } = parsed.data
    const supabase = getSupabaseServer()

    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    console.log(data)
    if (error) {
        return { error: error.message, success: false }
    }

    redirect('/dashboard')
}
