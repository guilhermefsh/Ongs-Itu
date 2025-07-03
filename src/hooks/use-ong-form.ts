import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition, useState, useMemo, useCallback } from "react"
import { ongSchema, type OngFormData } from "@/app/(private)/dashboard/cadastrar-ong/schema"
import { createOng } from "@/app/actions/ongs/create-ong"

interface UseOngFormProps {
    initialData: {
        user: { id: string; email: string | null }
        areasAtuacao: { id: number; nome: string }[]
        formasAjuda: { id: number; nome: string }[]
        certificacoes: { id: number; nome: string }[]
    }
}

export function useOngForm({ initialData }: UseOngFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const form = useForm<OngFormData>({
        resolver: zodResolver(ongSchema),
        defaultValues: {
            email: initialData.user.email || "",
            city: "Itu",
            state: "SP",
            areasOfAction: [],
            helpTypes: [],
            certifications: [],
        },
    })

    const helpTypes = form.watch("helpTypes")

    const onSubmit = useCallback(async (data: OngFormData) => {
        setError(null)

        startTransition(async () => {
            try {
                await createOng(data)
                setSuccess(true)
                setTimeout(() => {
                    router.push("/dashboard/minha-ong")
                }, 3000)
            } catch (error: any) {
                setError("Erro ao cadastrar ONG. Tente novamente.")
            }
        })
    }, [router])

    const handleAreaChange = useCallback((areaId: number, checked: boolean) => {
        const currentAreas = form.watch("areasOfAction")
        if (checked) {
            form.setValue("areasOfAction", [...currentAreas, areaId])
        } else {
            form.setValue("areasOfAction", currentAreas.filter((id) => id !== areaId))
        }
    }, [form])

    const handleHelpTypeChange = useCallback((helpTypeId: number, checked: boolean) => {
        const currentFormas = form.watch("helpTypes")
        if (checked) {
            form.setValue("helpTypes", [...currentFormas, helpTypeId])
        } else {
            form.setValue("helpTypes", currentFormas.filter((id) => id !== helpTypeId))
        }
    }, [form])

    const handleCertificationChange = useCallback((certId: number, checked: boolean) => {
        const currentCerts = form.watch("certifications")
        if (checked) {
            form.setValue("certifications", [...currentCerts, certId])
        } else {
            form.setValue("certifications", currentCerts.filter((id) => id !== certId))
        }
    }, [form])

    const formSubmit = useMemo(() => form.handleSubmit(onSubmit), [form, onSubmit])

    return {
        form,
        isPending,
        error,
        success,
        helpTypes,
        onSubmit: formSubmit,
        handleAreaChange,
        handleHelpTypeChange,
        handleCertificationChange,
    }
} 