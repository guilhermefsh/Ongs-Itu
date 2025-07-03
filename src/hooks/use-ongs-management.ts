import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/database.types"

type ONG = Database["public"]["Tables"]["ongs"]["Row"]

export function useOngsManagement() {
    const router = useRouter()
    const supabase = getSupabaseClient()

    const [ongs, setOngs] = useState<ONG[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")

    const fetchOngs = useCallback(async () => {
        setLoading(true)

        let query = supabase.from("ongs").select("*").order("created_at", { ascending: false })

        if (statusFilter !== "all") {
            query = query.eq("status", statusFilter)
        }

        const { data, error } = await query

        if (error) {
            console.error("Erro ao buscar ONGs:", error)
        } else {
            setOngs(data || [])
        }

        setLoading(false)
    }, [supabase, statusFilter])

    useEffect(() => {
        const checkUserRole = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            if (user) {
                const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

                if (!profile || profile.role !== "admin") {
                    router.push("/dashboard")
                } else {
                    fetchOngs()
                }
            } else {
                router.push("/auth/login")
            }
        }

        checkUserRole()
    }, [router, supabase, fetchOngs])

    useEffect(() => {
        fetchOngs()
    }, [fetchOngs])

    const handleSearch = useCallback((e: React.FormEvent) => {
        e.preventDefault()
        fetchOngs()
    }, [fetchOngs])

    const handleStatusChange = useCallback(async (ongId: string, newStatus: string) => {
        const { error } = await supabase.from("ongs").update({ status: newStatus }).eq("id", ongId)

        if (error) {
            console.error("Erro ao atualizar status:", error)
        } else {
            fetchOngs()
        }
    }, [supabase, fetchOngs])

    const handleDelete = useCallback(async (ongId: string) => {
        if (window.confirm("Tem certeza que deseja excluir esta ONG? Esta ação não pode ser desfeita.")) {
            const { error } = await supabase.from("ongs").delete().eq("id", ongId)

            if (error) {
                console.error("Erro ao excluir ONG:", error)
            } else {
                fetchOngs()
            }
        }
    }, [supabase, fetchOngs])

    const filteredOngs = useMemo(() => {
        return ongs.filter(
            (ong) =>
                ong.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ong.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (ong.cnpj && ong.cnpj.includes(searchTerm)),
        )
    }, [ongs, searchTerm])

    return {
        ongs: filteredOngs,
        loading,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        handleSearch,
        handleStatusChange,
        handleDelete,
    }
} 