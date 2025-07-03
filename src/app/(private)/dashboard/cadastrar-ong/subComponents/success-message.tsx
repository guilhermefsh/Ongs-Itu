import { CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SuccessMessage() {
    return (
        <Card className="dark:border-gray-800 dark:bg-gray-950">
            <CardHeader>
                <div className="flex items-center justify-center mb-4">
                    <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900">
                        <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                </div>
                <CardTitle className="text-center text-2xl dark:text-gray-100">Cadastro enviado com sucesso!</CardTitle>
                <CardDescription className="text-center dark:text-gray-400">
                    Seu cadastro foi recebido e está em análise pela nossa equipe.
                </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Você receberá um e-mail quando seu cadastro for aprovado. Enquanto isso, você já pode acessar seu painel e
                    complementar as informações da sua ONG.
                </p>
                <p className="text-gray-600 dark:text-gray-300">Redirecionando para o painel...</p>
            </CardContent>
        </Card>
    )
} 