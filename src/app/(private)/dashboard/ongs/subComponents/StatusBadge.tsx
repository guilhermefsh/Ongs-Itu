import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock } from "lucide-react"

interface StatusBadgeProps {
    status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const badgeContent = useMemo(() => {
        switch (status) {
            case "aprovado":
                return (
                    <>
                        <CheckCircle className="mr-1 h-3 w-3" /> Aprovado
                    </>
                )
            case "pendente":
                return (
                    <>
                        <Clock className="mr-1 h-3 w-3" /> Pendente
                    </>
                )
            case "rejeitado":
                return (
                    <>
                        <XCircle className="mr-1 h-3 w-3" /> Rejeitado
                    </>
                )
            default:
                return status
        }
    }, [status])

    const badgeClassName = useMemo(() => {
        switch (status) {
            case "aprovado":
                return "bg-emerald-500 hover:bg-emerald-600"
            case "pendente":
                return "bg-amber-500 hover:bg-amber-600"
            case "rejeitado":
                return "bg-red-500 hover:bg-red-600"
            default:
                return "bg-gray-500 hover:bg-gray-600"
        }
    }, [status])

    return (
        <Badge className={badgeClassName}>
            {badgeContent}
        </Badge>
    )
} 