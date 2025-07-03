import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Clock, AlertCircle } from "lucide-react"

interface StatusAlertsProps {
    status: string
}

export function StatusAlerts({ status }: StatusAlertsProps) {
    if (status === "pendente") {
        return (
            <Alert className="mb-6 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">
                <Clock className="h-4 w-4" />
                <AlertTitle>Cadastro em análise</AlertTitle>
                <AlertDescription>
                    Seu cadastro está sendo analisado pela nossa equipe. Você receberá um e-mail quando for aprovado.
                </AlertDescription>
            </Alert>
        )
    }

    if (status === "rejeitado") {
        return (
            <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Cadastro rejeitado</AlertTitle>
                <AlertDescription>
                    Seu cadastro foi rejeitado. Entre em contato conosco para mais informações.
                </AlertDescription>
            </Alert>
        )
    }

    return null
} 