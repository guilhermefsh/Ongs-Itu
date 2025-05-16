"use server"
import { OngFormData } from "@/app/(private)/dashboard/cadastrar-ong/schema"
import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function getInitialData() {
    const supabase = getSupabaseServer()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect("/auth/login")
    }

    const { data: areasData } = await supabase.from("areas_atuacao").select("id, nome").order("nome")
    const { data: formasData } = await supabase.from("formas_ajuda").select("id, nome").order("nome")
    const { data: certData } = await supabase.from("certificacoes").select("id, nome").order("nome")

    return {
        user,
        areasAtuacao: areasData || [],
        formasAjuda: formasData || [],
        certificacoes: certData || [],
    }
}

export async function createOng(data: OngFormData) {
    const supabase = getSupabaseServer()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error("Usuário não autenticado")
    }

    const { data: ongData, error: ongError } = await supabase
        .from("ongs")
        .insert({
            user_id: user.id,
            nome: data.name,
            descricao_curta: data.shortDescription,
            descricao_completa: data.fullDescription,
            ano_fundacao: Number.parseInt(data.foundingYear),
            causa: data.mainCause,
            endereco: data.address ? `${data.address}, ${data.number}${data.complement ? ` - ${data.complement}` : ""}, ${data.neighborhood}` : null,
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
            status: "pendente",
        })
        .select("id")
        .single()

    if (ongError) {
        throw ongError
    }

    const ongId = ongData.id

    if (data.areasOfAction.length > 0) {
        const areasInsert = data.areasOfAction.map((areaId) => ({
            ong_id: ongId,
            area_id: areaId,
        }))

        const { error: areasError } = await supabase.from("ong_areas_atuacao").insert(areasInsert)
        if (areasError) {
            throw areasError
        }
    }

    if (data.helpTypes.length > 0) {
        const formasInsert = data.helpTypes.map((formaId) => {
            let descricao = null

            if (formaId === 1) {
                descricao = data.volunteerDescription
            } else if (formaId === 2) {
                descricao = data.donationDescription
            } else if (formaId === 6) {
                descricao = data.partnershipDescription
            }

            return {
                ong_id: ongId,
                forma_id: formaId,
                descricao,
            }
        })

        const { error: formasError } = await supabase.from("ong_formas_ajuda").insert(formasInsert)
        if (formasError) {
            throw formasError
        }
    }

    if (data.certifications.length > 0) {
        const certInsert = data.certifications.map((certId) => ({
            ong_id: ongId,
            certificacao_id: certId,
        }))

        const { error: certError } = await supabase.from("ong_certificacoes").insert(certInsert)
        if (certError) {
            throw certError
        }
    }

    return { success: true }
} 