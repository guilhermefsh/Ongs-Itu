import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface NoOngStateProps {
    onCadastrarOng: () => void
}

export function NoOngState({ onCadastrarOng }: NoOngStateProps) {
    return (
        <div className="container mx-auto py-6">
            <Card>
                <CardHeader>
                    <CardTitle>Nenhuma ONG cadastrada</CardTitle>
                    <CardDescription>Você ainda não cadastrou nenhuma ONG na plataforma.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Para cadastrar sua ONG, clique no botão abaixo e preencha o formulário com os dados da sua organização.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={onCadastrarOng}>Cadastrar ONG</Button>
                </CardFooter>
            </Card>
        </div>
    )
} 