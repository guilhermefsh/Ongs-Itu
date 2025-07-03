import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, ExternalLink, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Organization } from "../types"

interface OngHeaderProps {
    organization: Organization
    getStatusBadge: (status: string) => string
    onViewPublicPage: () => void
    onEditOng: () => void
}

export function OngHeader({ organization, getStatusBadge, onViewPublicPage, onEditOng }: OngHeaderProps) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "aprovado":
                return <CheckCircle className="h-3 w-3" />
            case "pendente":
                return <Clock className="h-3 w-3" />
            case "rejeitado":
                return <AlertCircle className="h-3 w-3" />
            default:
                return null
        }
    }

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight dark:text-gray-100">{organization.nome}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Status:{" "}
                    <Badge variant={getStatusBadge(organization.status) as any} className="flex items-center gap-1 inline-flex">
                        {getStatusIcon(organization.status)}
                        {organization.status.charAt(0).toUpperCase() + organization.status.slice(1)}
                    </Badge>
                </p>
            </div>
            <div className="mt-4 md:mt-0">
                <Button variant="outline" className="mr-2" onClick={onViewPublicPage}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver página pública
                </Button>
                <Button onClick={onEditOng}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar ONG
                </Button>
            </div>
        </div>
    )
} 