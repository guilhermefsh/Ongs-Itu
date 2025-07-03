"use client"

import { useProfile } from "@/hooks/use-profile"
import {
    ProfileTabs,
    LoadingState
} from "./subComponents"

export default function PerfilPage() {
    const {
        loading,
        profileForm,
        passwordForm,
        isSaving,
        isChangingPassword,
        handleAvatarUpload,
        onSubmitProfile,
        onSubmitPassword,
    } = useProfile()

    if (loading) {
        return <LoadingState />
    }

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>

            <ProfileTabs
                profileForm={profileForm}
                passwordForm={passwordForm}
                isSaving={isSaving}
                isChangingPassword={isChangingPassword}
                onSubmitProfile={onSubmitProfile}
                onSubmitPassword={onSubmitPassword}
                onAvatarUpload={handleAvatarUpload}
            />
        </div>
    )
}
