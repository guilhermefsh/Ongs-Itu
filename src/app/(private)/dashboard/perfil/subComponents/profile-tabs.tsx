import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UseFormReturn } from "react-hook-form"

import { ProfileInformationTab } from "./profile-information-tab"
import { ProfilePasswordTab } from "./profile-password-tab"

interface ProfileTabsProps {
    profileForm: UseFormReturn<any>
    passwordForm: UseFormReturn<any>
    isSaving: boolean
    isChangingPassword: boolean
    onSubmitProfile: (data: any) => void
    onSubmitPassword: (data: any) => void
    onAvatarUpload: (file: File) => Promise<string | null>
}

export function ProfileTabs({
    profileForm,
    passwordForm,
    isSaving,
    isChangingPassword,
    onSubmitProfile,
    onSubmitPassword,
    onAvatarUpload,
}: ProfileTabsProps) {
    return (
        <Tabs defaultValue="informacoes" className="w-full">
            <TabsList className="mb-4">
                <TabsTrigger value="informacoes">Informações Pessoais</TabsTrigger>
                <TabsTrigger value="senha">Alterar Senha</TabsTrigger>
            </TabsList>

            <TabsContent value="informacoes">
                <ProfileInformationTab
                    form={profileForm}
                    isSaving={isSaving}
                    onSubmit={onSubmitProfile}
                    onAvatarUpload={onAvatarUpload}
                />
            </TabsContent>

            <TabsContent value="senha">
                <ProfilePasswordTab
                    form={passwordForm}
                    isChangingPassword={isChangingPassword}
                    onSubmit={onSubmitPassword}
                />
            </TabsContent>
        </Tabs>
    )
} 