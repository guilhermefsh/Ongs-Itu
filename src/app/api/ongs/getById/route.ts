import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: "ID da ONG não fornecido" }, { status: 400 })
        }

        const supabase = createRouteHandlerClient({ cookies })

        const { data: ongData, error: ongError } = await supabase
            .from("ongs")
            .select("*")
            .eq("id", id)
            .eq("status", "aprovado")
            .single()

        if (ongError) {
            console.error("Erro ao buscar ONG:", ongError)
            return NextResponse.json({ error: "Erro ao buscar ONG" }, { status: 500 })
        }

        if (!ongData) {
            return NextResponse.json({ error: "ONG não encontrada" }, { status: 404 })
        }

        const { data: formasData, error: formasError } = await supabase
            .from("ong_formas_ajuda")
            .select(`
                forma_id,
                descricao,
                formas_ajuda(nome)
            `)
            .eq("ong_id", id)

        if (formasError) {
            console.error("Erro ao buscar formas de ajuda:", formasError)
            return NextResponse.json({ error: "Erro ao buscar formas de ajuda" }, { status: 500 })
        }

        const formattedOng = {
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
                    "Contact us to learn how to help as a volunteer.",
                donation: formasData?.find((f) => f.forma_id === 2)?.descricao ||
                    "Contact us to learn how to help with donations.",
                partnership: formasData?.find((f) => f.forma_id === 6)?.descricao ||
                    "Contact us to establish partnerships."
            }
        }

        return NextResponse.json(formattedOng)
    } catch (error) {
        console.error("Erro interno ao buscar ONG:", error)
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
    }
} 