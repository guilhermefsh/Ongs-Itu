import { Loader2 } from "lucide-react"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UseFormReturn } from "react-hook-form"

import { ProfileAvatar } from "./profile-avatar"
import { ProfileForm } from "./profile-form"

interface ProfileInformationTabProps {
    form: UseFormReturn<any>
    isSaving: boolean
    onSubmit: (data: any) => void
    onAvatarUpload: (file: File) => Promise<string | null>
}

export function ProfileInformationTab({
    form,
    isSaving,
    onSubmit,
    onAvatarUpload
}: ProfileInformationTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Atualize suas informações pessoais e seu avatar.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <ProfileAvatar form={form} onUpload={onAvatarUpload} />
                            <ProfileForm form={form} />
                        </div>

                        <Button type="submit" disabled={isSaving} className="w-full md:w-auto">
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSaving ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
} 