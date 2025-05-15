"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { updatePasswordAction } from "@/app/actions/auth/update-password"
import { SubmitButton } from "@/components/ui/submit-button"

const updatePasswordSchema = z.object({
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>

const initialState = { error: '' }

export function UpdatePasswordForm() {
  const [state, formAction] = useActionState(updatePasswordAction, initialState)
  const {
    register,
    formState: { errors, isValid },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    mode: 'onBlur',
  })

  return (
    <Card className="w-full max-w-md mx-auto dark:border-gray-800 dark:bg-gray-950">
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle className="text-2xl dark:text-gray-100">Atualizar senha</CardTitle>
        <CardDescription className="dark:text-gray-400">
          Defina uma nova senha para sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {'error' in state && state.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="password" className="dark:text-gray-200">
              Nova senha
            </Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="dark:text-gray-200">
              Confirmar nova senha
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <SubmitButton disabled={!isValid} loadingText="Atualizando senha...">
            Atualizar senha
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  )
}
