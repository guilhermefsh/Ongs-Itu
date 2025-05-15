"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, CheckCircle, XCircle, Eye, Edit, Trash, Clock } from "lucide-react"
import type { Database } from "@/lib/supabase/database.types"

type ONG = Database["public"]["Tables"]["ongs"]["Row"]

export default function ONGsPage() {
  const router = useRouter()
  const supabase = getSupabaseClient()

  const [ongs, setOngs] = useState<ONG[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

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
  }, [router, supabase])

  const fetchOngs = async () => {
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
  }

  useEffect(() => {
    fetchOngs()
  }, [statusFilter])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchOngs()
  }

  const handleStatusChange = async (ongId: string, newStatus: string) => {
    const { error } = await supabase.from("ongs").update({ status: newStatus }).eq("id", ongId)

    if (error) {
      console.error("Erro ao atualizar status:", error)
    } else {
      fetchOngs()
    }
  }

  const handleDelete = async (ongId: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta ONG? Esta ação não pode ser desfeita.")) {
      const { error } = await supabase.from("ongs").delete().eq("id", ongId)

      if (error) {
        console.error("Erro ao excluir ONG:", error)
      } else {
        fetchOngs()
      }
    }
  }

  const filteredOngs = ongs.filter(
    (ong) =>
      ong.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ong.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ong.cnpj && ong.cnpj.includes(searchTerm)),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600">
            <CheckCircle className="mr-1 h-3 w-3" /> Aprovado
          </Badge>
        )
      case "pendente":
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600">
            <Clock className="mr-1 h-3 w-3" /> Pendente
          </Badge>
        )
      case "rejeitado":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <XCircle className="mr-1 h-3 w-3" /> Rejeitado
          </Badge>
        )
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600">{status}</Badge>
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight dark:text-gray-100">Gerenciar ONGs</h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar por nome, email ou CNPJ"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pendente">Pendentes</SelectItem>
            <SelectItem value="aprovado">Aprovados</SelectItem>
            <SelectItem value="rejeitado">Rejeitados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="dark:border-gray-800 dark:bg-gray-950">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl dark:text-gray-100">Lista de ONGs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <p className="text-gray-500 dark:text-gray-400">Carregando...</p>
            </div>
          ) : filteredOngs.length === 0 ? (
            <div className="flex justify-center py-8">
              <p className="text-gray-500 dark:text-gray-400">Nenhuma ONG encontrada</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Causa</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Cadastro</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOngs.map((ong) => (
                    <TableRow key={ong.id}>
                      <TableCell className="font-medium dark:text-gray-300">{ong.nome}</TableCell>
                      <TableCell className="dark:text-gray-300">{ong.email}</TableCell>
                      <TableCell className="dark:text-gray-300">{ong.causa}</TableCell>
                      <TableCell>{getStatusBadge(ong.status)}</TableCell>
                      <TableCell className="dark:text-gray-300">
                        {new Date(ong.created_at).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/ongs/${ong.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Visualizar</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/ongs/${ong.id}/editar`}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {ong.status !== "aprovado" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(ong.id, "aprovado")}>
                                <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                                <span>Aprovar</span>
                              </DropdownMenuItem>
                            )}
                            {ong.status !== "pendente" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(ong.id, "pendente")}>
                                <Clock className="mr-2 h-4 w-4 text-amber-500" />
                                <span>Marcar como pendente</span>
                              </DropdownMenuItem>
                            )}
                            {ong.status !== "rejeitado" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(ong.id, "rejeitado")}>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                <span>Rejeitar</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(ong.id)}
                              className="text-red-600 dark:text-red-400"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Excluir</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
