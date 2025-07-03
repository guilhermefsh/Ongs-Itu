import { useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface SearchAndFilterProps {
    searchTerm: string
    setSearchTerm: (value: string) => void
    statusFilter: string
    setStatusFilter: (value: string) => void
    handleSearch: (e: React.FormEvent) => void
}

export function SearchAndFilter({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSearch,
}: SearchAndFilterProps) {
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }, [setSearchTerm])

    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder="Buscar por nome, email ou CNPJ"
                        className="pl-10"
                        value={searchTerm}
                        onChange={handleInputChange}
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
    )
} 