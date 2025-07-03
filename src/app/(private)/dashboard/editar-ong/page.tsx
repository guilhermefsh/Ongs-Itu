"use client"

import { useEditOng } from "@/hooks/use-edit-ong"
import { LoadingState, SuccessMessage, EditForm } from "./subComponents"

export default function EditONGPage() {
    const {
        form,
        isPending,
        saving,
        error,
        success,
        ongId,
        areasOfActionOptions,
        helpTypesOptions,
        certificationsOptions,
        onSubmit,
        handleCancel
    } = useEditOng()

    if (isPending) {
        return <LoadingState />
    }

    if (success) {
        return <SuccessMessage />
    }

    return (
        <EditForm
            form={form}
            error={error}
            saving={saving}
            ongId={ongId}
            areasOfActionOptions={areasOfActionOptions}
            helpTypesOptions={helpTypesOptions}
            certificationsOptions={certificationsOptions}
            onSubmit={onSubmit}
            onCancel={handleCancel}
        />
    )
}
