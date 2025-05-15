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
import { registerAction } from "@/app/actions/auth/register"
import { SubmitButton } from "@/components/ui/submit-button"

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

const initialState = { error: '' }

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, initialState)
  const {
    register,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  })

  if ('success' in state) {
    return (
      <Card className="w-full max-w-md mx-auto dark:border-gray-800 dark:bg-gray-950">
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle className="text-2xl dark:text-gray-100">Verifique seu email</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Enviamos um link de confirmação para seu email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Por favor, verifique sua caixa de entrada e clique no link de confirmação para ativar sua conta.
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
        <CardTitle className="text-2xl dark:text-gray-100">Criar conta</CardTitle>
        <CardDescription className="dark:text-gray-400">
          Cadastre-se para gerenciar sua ONG
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
          <div className="space-y-2">
            <Label htmlFor="password" className="dark:text-gray-200">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="dark:text-gray-200">
              Confirmar Senha
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <SubmitButton disabled={!isValid} loadingText="Criando conta...">
            Criar conta
          </SubmitButton>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Já tem uma conta?{" "}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
          >
            Faça login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

