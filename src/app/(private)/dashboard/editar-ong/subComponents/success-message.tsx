import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export function SuccessMessage() {
    return (
        <div className="max-w-3xl mx-auto">
            <Card className="dark:border-gray-800 dark:bg-gray-950">
                <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                        <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                            <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <CardTitle className="text-center text-2xl dark:text-gray-100">Dados atualizados com sucesso!</CardTitle>
                    <CardDescription className="text-center dark:text-gray-400">
                        As informações da sua ONG foram atualizadas com sucesso.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-gray-600 dark:text-gray-300">Redirecionando para o painel...</p>
                </CardContent>
            </Card>
        </div>
    )
} 