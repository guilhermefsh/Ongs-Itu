import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export type ONG = {
    id: string
    name: string
    cause: string
    description: string
    image: string
    address: string
    phone: string
    email: string
    website: string
    facebook: string
    instagram: string
    howToHelp: {
        volunteering: string
        donation: string
        partnership: string
    }
}

// Memoized default help messages
const DEFAULT_HELP_MESSAGES = {
    volunteering: "Entre em contato para saber como ajudar como voluntário.",
    donation: "Entre em contato para saber como ajudar com doações.",
    partnership: "Entre em contato para estabelecer parcerias."
} as const

export async function useOngDetails(id: string): Promise<ONG | null> {
    const supabase = createServerComponentClient({ cookies })

    const { data: ongData, error: ongError } = await supabase
        .from("ongs")
        .select("*")
        .eq("id", id)
        .eq("status", "aprovado")
        .single()

    if (ongError || !ongData) {
        return null
    }

    const { data: formasData } = await supabase
        .from("ong_formas_ajuda")
        .select(`
      forma_id,
      descricao,
      formas_ajuda(nome)
    `)
        .eq("ong_id", id)

    return {
        id: ongData.id,
        name: ongData.nome,
        cause: ongData.causa,
        description: ongData.descricao_completa,
        image: ongData.imagem_capa_url || "/images/placeholder-image.jpg",
        address: ongData.endereco,
        phone: ongData.telefone,
        email: ongData.email,
        website: ongData.site,
        facebook: ongData.facebook,
        instagram: ongData.instagram,
        howToHelp: {
            volunteering: formasData?.find((f) => f.forma_id === 1)?.descricao ||
                DEFAULT_HELP_MESSAGES.volunteering,
            donation: formasData?.find((f) => f.forma_id === 2)?.descricao ||
                DEFAULT_HELP_MESSAGES.donation,
            partnership: formasData?.find((f) => f.forma_id === 6)?.descricao ||
                DEFAULT_HELP_MESSAGES.partnership
        }
    }
} 