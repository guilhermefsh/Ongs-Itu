import { Loader2 } from "lucide-react"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UseFormReturn } from "react-hook-form"

import { PasswordForm } from "./password-form"

interface ProfilePasswordTabProps {
    form: UseFormReturn<any>
    isChangingPassword: boolean
    onSubmit: (data: any) => void
}

export function ProfilePasswordTab({
    form,
    isChangingPassword,
    onSubmit
}: ProfilePasswordTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Alterar Senha</CardTitle>
                <CardDescription>Altere sua senha de acesso à plataforma.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <PasswordForm form={form} />

                        <Button type="submit" disabled={isChangingPassword} className="w-full md:w-auto">
                            {isChangingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isChangingPassword ? "Alterando..." : "Alterar Senha"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
} 