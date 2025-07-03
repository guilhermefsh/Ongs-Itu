import { useState, useEffect, useTransition, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { getSupabaseClient } from "@/lib/supabase/client"
import { editOngSchema, type EditOngFormData } from "@/app/(private)/dashboard/editar-ong/schema"

export interface AreaOfAction {
    id: number
    name: string
}

export interface HelpType {
    id: number
    name: string
}

export interface Certification {
    id: number
    name: string
}

export function useEditOng() {
    const router = useRouter()
    const supabase = useMemo(() => getSupabaseClient(), [])
    const [isPending, startTransition] = useTransition()

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [ongId, setOngId] = useState<string | null>(null)
    const [areasOfActionOptions, setAreasOfActionOptions] = useState<AreaOfAction[]>([])
    const [helpTypesOptions, setHelpTypesOptions] = useState<HelpType[]>([])
    const [certificationsOptions, setCertificationsOptions] = useState<Certification[]>([])

    const form = useForm<EditOngFormData>({
        resolver: zodResolver(editOngSchema),
        defaultValues: {
            name: "",
            tradeName: "",
            shortDescription: "",
            fullDescription: "",
            foundingYear: "",
            mainCause: "",
            targetAudience: "",
            email: "",
            phone: "",
            website: "",
            facebook: "",
            instagram: "",
            address: "",
            city: "Itu",
            state: "SP",
            zipCode: "",
            responsibleName: "",
            responsibleRole: "",
            logoUrl: null,
            coverImageUrl: null,
            galleryImages: [],
            areasOfAction: [],
            helpTypes: [],
            volunteerDescription: "",
            donationDescription: "",
            partnershipDescription: "",
            cnpj: "",
            certifications: []
        }
    })

    const fetchOngData = useCallback(async () => {
        try {
            startTransition(async () => {
                const { data: { user }, error: userError } = await supabase.auth.getUser()

                if (userError) throw new Error("Erro ao buscar usuário: " + userError.message)
                if (!user) {
                    router.push("/auth/login")
                    return
                }

                const { data: ongData, error: ongError } = await supabase
                    .from("ongs")
                    .select("*")
                    .eq("user_id", user.id)
                    .single()

                if (ongError) {
                    if (ongError.code === "PGRST116") {
                        router.push("/dashboard/cadastrar-ong")
                        return
                    }
                    throw new Error("Erro ao buscar dados da ONG: " + ongError.message)
                }

                if (!ongData) {
                    router.push("/dashboard/cadastrar-ong")
                    return
                }

                setOngId(ongData.id)

                const { data: galeriaData } = await supabase
                    .from("ong_imagens")
                    .select("url")
                    .eq("ong_id", ongData.id)
                    .order("ordem", { ascending: true })

                const { data: areasData } = await supabase
                    .from("areas_atuacao")
                    .select("id, nome")
                    .order("nome")

                const { data: ongAreasData } = await supabase
                    .from("ong_areas_atuacao")
                    .select("area_id")
                    .eq("ong_id", ongData.id)

                const { data: formasData } = await supabase
                    .from("formas_ajuda")
                    .select("id, nome")
                    .order("nome")

                const { data: ongFormasData } = await supabase
                    .from("ong_formas_ajuda")
                    .select("forma_id, descricao")
                    .eq("ong_id", ongData.id)

                const { data: certData } = await supabase
                    .from("certificacoes")
                    .select("id, nome")
                    .order("nome")

                const { data: ongCertData } = await supabase
                    .from("ong_certificacoes")
                    .select("certificacao_id")
                    .eq("ong_id", ongData.id)

                form.reset({
                    name: ongData.nome || "",
                    tradeName: ongData.nome_fantasia || "",
                    shortDescription: ongData.descricao_curta || "",
                    fullDescription: ongData.descricao_completa || "",
                    foundingYear: ongData.ano_fundacao?.toString() || "",
                    mainCause: ongData.causa || "",
                    targetAudience: ongData.publico_alvo || "",
                    email: ongData.email || "",
                    phone: ongData.telefone || "",
                    website: ongData.site || "",
                    facebook: ongData.facebook || "",
                    instagram: ongData.instagram || "",
                    address: ongData.endereco || "",
                    city: ongData.cidade || "Itu",
                    state: ongData.estado || "SP",
                    zipCode: ongData.cep || "",
                    responsibleName: ongData.responsavel || "",
                    responsibleRole: ongData.cargo_responsavel || "",
                    logoUrl: ongData.logo_url,
                    coverImageUrl: ongData.imagem_capa_url,
                    galleryImages: galeriaData?.map(item => item.url) || [],
                    areasOfAction: ongAreasData?.map(item => item.area_id) || [],
                    helpTypes: ongFormasData?.map(item => item.forma_id) || [],
                    volunteerDescription: ongFormasData?.find(item => item.forma_id === 1)?.descricao || "",
                    donationDescription: ongFormasData?.find(item => item.forma_id === 2)?.descricao || "",
                    partnershipDescription: ongFormasData?.find(item => item.forma_id === 6)?.descricao || "",
                    cnpj: ongData.cnpj || "",
                    certifications: ongCertData?.map(item => item.certificacao_id) || []
                })

                if (areasData) setAreasOfActionOptions(areasData.map(item => ({ id: item.id, name: item.nome })))
                if (formasData) setHelpTypesOptions(formasData.map(item => ({ id: item.id, name: item.nome })))
                if (certData) setCertificationsOptions(certData.map(item => ({ id: item.id, name: item.nome })))
            })
        } catch (error: any) {
            setError(error.message)
            console.error("Erro ao buscar dados:", error)
        }
    }, [router, supabase, form])

    const onSubmit = useCallback(async (data: EditOngFormData) => {
        if (!ongId) {
            setError("ID da ONG não encontrado")
            return
        }

        setSaving(true)
        setError(null)

        try {
            const { error: ongError } = await supabase
                .from("ongs")
                .update({
                    nome: data.name,
                    descricao_curta: data.shortDescription,
                    descricao_completa: data.fullDescription,
                    ano_fundacao: Number.parseInt(data.foundingYear),
                    causa: data.mainCause,
                    publico_alvo: data.targetAudience || null,
                    logo_url: data.logoUrl,
                    imagem_capa_url: data.coverImageUrl,
                    endereco: data.address || null,
                    cidade: data.city,
                    estado: data.state,
                    cep: data.zipCode || null,
                    telefone: data.phone || null,
                    email: data.email,
                    site: data.website || null,
                    facebook: data.facebook || null,
                    instagram: data.instagram || null,
                    cnpj: data.cnpj || null,
                    responsavel: data.responsibleName,
                    cargo_responsavel: data.responsibleRole,
                })
                .eq("id", ongId)

            if (ongError) throw ongError

            await supabase.from("ong_imagens").delete().eq("ong_id", ongId)

            if (data.galleryImages.length > 0) {
                const imagesInsert = data.galleryImages.map((url, index) => ({
                    ong_id: ongId,
                    url,
                    ordem: index,
                }))

                const { error: imagesError } = await supabase.from("ong_imagens").insert(imagesInsert)
                if (imagesError) throw imagesError
            }

            await supabase.from("ong_areas_atuacao").delete().eq("ong_id", ongId)

            if (data.areasOfAction.length > 0) {
                const areasInsert = data.areasOfAction.map(areaId => ({
                    ong_id: ongId,
                    area_id: areaId,
                }))

                const { error: areasError } = await supabase.from("ong_areas_atuacao").insert(areasInsert)
                if (areasError) throw areasError
            }

            await supabase.from("ong_formas_ajuda").delete().eq("ong_id", ongId)

            if (data.helpTypes.length > 0) {
                const formasInsert = data.helpTypes.map(formaId => ({
                    ong_id: ongId,
                    forma_id: formaId,
                    descricao: formaId === 1 ? data.volunteerDescription :
                        formaId === 2 ? data.donationDescription :
                            formaId === 6 ? data.partnershipDescription : null
                }))

                const { error: formasError } = await supabase.from("ong_formas_ajuda").insert(formasInsert)
                if (formasError) throw formasError
            }

            await supabase.from("ong_certificacoes").delete().eq("ong_id", ongId)

            if (data.certifications.length > 0) {
                const certInsert = data.certifications.map(certId => ({
                    ong_id: ongId,
                    certificacao_id: certId,
                }))

                const { error: certError } = await supabase.from("ong_certificacoes").insert(certInsert)
                if (certError) throw certError
            }

            setSuccess(true)
            setTimeout(() => {
                router.push("/dashboard/minha-ong")
            }, 3000)
        } catch (error: any) {
            setError(error.message || "Erro ao atualizar ONG. Tente novamente.")
        } finally {
            setSaving(false)
        }
    }, [ongId, supabase, router])

    const handleCancel = useCallback(() => {
        router.push("/dashboard/minha-ong")
    }, [router])

    useEffect(() => {
        fetchOngData()
    }, [fetchOngData])

    const formSubmit = useMemo(() => form.handleSubmit(onSubmit), [form, onSubmit])

    return {
        form,
        isPending,
        saving,
        error,
        success,
        ongId,
        areasOfActionOptions,
        helpTypesOptions,
        certificationsOptions,
        onSubmit: formSubmit,
        handleCancel
    }
} 