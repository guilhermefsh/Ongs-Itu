import { useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "./StatusBadge"
import { ActionsDropdown } from "./ActionsDropdown"
import type { Database } from "@/lib/supabase/database.types"

type ONG = Database["public"]["Tables"]["ongs"]["Row"]

interface OngsTableProps {
    ongs: ONG[]
    onStatusChange: (ongId: string, newStatus: string) => void
    onDelete: (ongId: string) => void
}

export function OngsTable({ ongs, onStatusChange, onDelete }: OngsTableProps) {
    const tableRows = useMemo(() => {
        return ongs.map((ong) => {
            const formattedDate = new Date(ong.created_at).toLocaleDateString("pt-BR")

            return (
                <TableRow key={ong.id}>
                    <TableCell className="font-medium dark:text-gray-300">{ong.nome}</TableCell>
                    <TableCell className="dark:text-gray-300">{ong.email}</TableCell>
                    <TableCell className="dark:text-gray-300">{ong.causa}</TableCell>
                    <TableCell>
                        <StatusBadge status={ong.status} />
                    </TableCell>
                    <TableCell className="dark:text-gray-300">{formattedDate}</TableCell>
                    <TableCell className="text-right">
                        <ActionsDropdown
                            ong={ong}
                            onStatusChange={onStatusChange}
                            onDelete={onDelete}
                        />
                    </TableCell>
                </TableRow>
            )
        })
    }, [ongs, onStatusChange, onDelete])

    return (
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
                    {tableRows}
                </TableBody>
            </Table>
        </div>
    )
} 