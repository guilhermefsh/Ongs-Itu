import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Area, AreaResponse, Certification, CertificationResponse, HelpForm, HelpFormResponse, Organization } from "@/app/(private)/dashboard/minha-ong/types"

export function useMyOng() {
    const router = useRouter()
    const supabase = useMemo(() => getSupabaseClient(), [])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [organization, setOrganization] = useState<Organization | null>(null)
    const [areas, setAreas] = useState<Area[]>([])
    const [helpForms, setHelpForms] = useState<HelpForm[]>([])
    const [certifications, setCertifications] = useState<Certification[]>([])
    const [galleryImages, setGalleryImages] = useState<string[]>([])

    const fetchOrganizationData = useCallback(async () => {
        try {
            setLoading(true)

            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser()

            if (userError) {
                throw new Error("Erro ao buscar usuário: " + userError.message)
            }

            if (!user) {
                router.push("/auth/login")
                return
            }

            const { data: orgData, error: orgError } = await supabase
                .from("ongs")
                .select("*")
                .eq("user_id", user.id)
                .single()

            if (orgError && orgError.code !== "PGRST116") {
                throw new Error("Erro ao buscar dados da ONG: " + orgError.message)
            }

            if (!orgData) {
                setOrganization(null)
                setLoading(false)
                return
            }

            setOrganization(orgData)

            // Buscar galeria de imagens
            const { data: galleryData, error: galleryError } = await supabase
                .from("ong_imagens")
                .select("url")
                .eq("ong_id", orgData.id)
                .order("ordem", { ascending: true })

            if (galleryError) {
                console.error("Erro ao buscar galeria de imagens:", galleryError)
            } else if (galleryData) {
                setGalleryImages(galleryData.map((item) => item.url))
            }

            // Buscar áreas de atuação
            const { data: areasData, error: areasError } = await supabase
                .from("ong_areas_atuacao")
                .select(`
                    area_id,
                    areas_atuacao (
                        id,
                        nome
                    )
                `)
                .eq("ong_id", orgData.id)

            if (areasError) {
                console.error("Erro ao buscar áreas de atuação:", areasError)
            } else if (areasData) {
                const typedAreasData = areasData as unknown as AreaResponse[]
                setAreas(typedAreasData.map((item) => ({
                    id: item.areas_atuacao.id,
                    nome: item.areas_atuacao.nome
                })))
            }

            // Buscar formas de ajuda
            const { data: formsData, error: formsError } = await supabase
                .from("ong_formas_ajuda")
                .select(`
                    forma_id,
                    descricao,
                    formas_ajuda (
                        id,
                        nome
                    )
                `)
                .eq("ong_id", orgData.id)

            if (formsError) {
                console.error("Erro ao buscar formas de ajuda:", formsError)
            } else if (formsData) {
                const typedFormsData = formsData as unknown as HelpFormResponse[]
                setHelpForms(typedFormsData.map((item) => ({
                    id: item.formas_ajuda.id,
                    nome: item.formas_ajuda.nome,
                    descricao: item.descricao
                })))
            }

            // Buscar certificações
            const { data: certData, error: certError } = await supabase
                .from("ong_certificacoes")
                .select(`
                    certificacao_id,
                    certificacoes (
                        id,
                        nome
                    )
                `)
                .eq("ong_id", orgData.id)

            if (certError) {
                console.error("Erro ao buscar certificações:", certError)
            } else if (certData) {
                const typedCertData = certData as unknown as CertificationResponse[]
                setCertifications(typedCertData.map((item) => ({
                    id: item.certificacoes[0].id,
                    nome: item.certificacoes[0].nome
                })))
            }
        } catch (error: any) {
            setError(error.message)
            console.error("Erro ao buscar dados:", error)
        } finally {
            setLoading(false)
        }
    }, [router, supabase])

    const getStatusBadge = useCallback((status: string) => {
        switch (status) {
            case "aprovado":
                return "success"
            case "pendente":
                return "warning"
            case "rejeitado":
                return "destructive"
            default:
                return "outline"
        }
    }, [])

    const handleEditOng = useCallback(() => {
        router.push("/dashboard/editar-ong")
    }, [router])

    const handleViewPublicPage = useCallback(() => {
        if (organization) {
            router.push(`/ongs/${organization.id}`)
        }
    }, [organization, router])

    const handleCadastrarOng = useCallback(() => {
        router.push("/dashboard/cadastrar-ong")
    }, [router])

    useEffect(() => {
        fetchOrganizationData()
    }, [fetchOrganizationData])

    return {
        loading,
        error,
        organization,
        areas,
        helpForms,
        certifications,
        galleryImages,
        getStatusBadge,
        handleEditOng,
        handleViewPublicPage,
        handleCadastrarOng,
        refetch: fetchOrganizationData
    }
} 