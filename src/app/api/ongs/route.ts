import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
    const supabase = getSupabaseServer()

    const { searchParams } = new URL(request.url)
    const searchTerm = searchParams.get("search") || ""
    const causeFilter = searchParams.get("cause") || "all"

    try {
        let query = supabase
            .from("ongs")
            .select("id, nome, descricao_curta, causa, logo_url, imagem_capa_url")
            .eq("status", "aprovado")

        if (causeFilter.toLowerCase() !== "all") {
            query = query.ilike("causa", `%${causeFilter}%`)
        }

        const { data, error } = await query

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        const filtered = data.filter(
            (ong) =>
                ong.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ong.descricao_curta.toLowerCase().includes(searchTerm.toLowerCase())
        )

        const result = filtered.map((ong) => ({
            id: ong.id,
            name: ong.nome,
            cause: ong.causa,
            description: ong.descricao_curta,
            logo: ong.logo_url || "/placeholder.svg?height=200&width=200",
            image: ong.imagem_capa_url || "/placeholder.svg?height=400&width=600",
        }))

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ error: "Erro desconhecido" }, { status: 500 })
    }
}
