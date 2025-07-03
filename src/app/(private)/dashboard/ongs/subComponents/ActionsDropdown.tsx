import { useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, CheckCircle, XCircle, Eye, Edit, Trash, Clock } from "lucide-react"
import type { Database } from "@/lib/supabase/database.types"

type ONG = Database["public"]["Tables"]["ongs"]["Row"]

interface ActionsDropdownProps {
    ong: ONG
    onStatusChange: (ongId: string, newStatus: string) => void
    onDelete: (ongId: string) => void
}

export function ActionsDropdown({ ong, onStatusChange, onDelete }: ActionsDropdownProps) {
    const handleApprove = useCallback(() => {
        onStatusChange(ong.id, "aprovado")
    }, [ong.id, onStatusChange])

    const handlePending = useCallback(() => {
        onStatusChange(ong.id, "pendente")
    }, [ong.id, onStatusChange])

    const handleReject = useCallback(() => {
        onStatusChange(ong.id, "rejeitado")
    }, [ong.id, onStatusChange])

    const handleDelete = useCallback(() => {
        onDelete(ong.id)
    }, [ong.id, onDelete])

    return (
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
                    <DropdownMenuItem onClick={handleApprove}>
                        <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                        <span>Aprovar</span>
                    </DropdownMenuItem>
                )}
                {ong.status !== "pendente" && (
                    <DropdownMenuItem onClick={handlePending}>
                        <Clock className="mr-2 h-4 w-4 text-amber-500" />
                        <span>Marcar como pendente</span>
                    </DropdownMenuItem>
                )}
                {ong.status !== "rejeitado" && (
                    <DropdownMenuItem onClick={handleReject}>
                        <XCircle className="mr-2 h-4 w-4 text-red-500" />
                        <span>Rejeitar</span>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-red-600 dark:text-red-400"
                >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Excluir</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 