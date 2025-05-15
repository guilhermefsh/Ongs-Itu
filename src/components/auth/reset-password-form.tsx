"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { resetPasswordAction } from "@/app/actions/auth/reset-password"
import { SubmitButton } from "@/components/ui/submit-button"

const resetPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

const initialState = { error: '' }

export function ResetPasswordForm() {
  const [state, formAction] = useActionState(resetPasswordAction, initialState)
  const {
    register,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
  })

  if ('success' in state) {
    return (
      <Card className="w-full max-w-md mx-auto dark:border-gray-800 dark:bg-gray-950">
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle className="text-2xl dark:text-gray-100">Verifique seu email</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Enviamos um link de redefinição de senha para seu email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Por favor, verifique sua caixa de entrada e clique no link para redefinir sua senha.
          </p>
          <Button asChild className="w-full">
            <Link href="/auth/login">Voltar para o login</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto dark:border-gray-800 dark:bg-gray-950">
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle className="text-2xl dark:text-gray-100">Recuperar senha</CardTitle>
        <CardDescription className="dark:text-gray-400">
          Enviaremos um link para redefinir sua senha
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="dark:text-gray-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <SubmitButton disabled={!isValid} loadingText="Enviando link...">
            Enviar link de recuperação
          </SubmitButton>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Lembrou sua senha?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
          >
            Voltar para o login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
