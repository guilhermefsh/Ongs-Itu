"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useOngForm } from "@/hooks/use-ong-form"
import { InformationTab, ContactTab, ActuationTab, DocumentsTab, SuccessMessage } from "./subComponents"

interface OngFormProps {
    initialData: {
        user: { id: string; email: string | null }
        areasAtuacao: { id: number; nome: string }[]
        formasAjuda: { id: number; nome: string }[]
        certificacoes: { id: number; nome: string }[]
    }
}

export function OngForm({ initialData }: OngFormProps) {
    const {
        form,
        isPending,
        error,
        success,
        helpTypes,
        onSubmit,
        handleAreaChange,
        handleHelpTypeChange,
        handleCertificationChange,
    } = useOngForm({ initialData })

    if (success) {
        return <SuccessMessage />
    }

    return (
        <Card className="dark:border-gray-800 dark:bg-gray-950">
            <CardHeader>
                <CardTitle className="dark:text-gray-100">Informações da ONG</CardTitle>
                <CardDescription className="dark:text-gray-400">
                    Preencha os dados da sua organização para cadastro na plataforma.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Tabs defaultValue="informacoes" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="informacoes">Informações</TabsTrigger>
                            <TabsTrigger value="contato">Contato</TabsTrigger>
                            <TabsTrigger value="atuacao">Atuação</TabsTrigger>
                            <TabsTrigger value="documentos">Documentos</TabsTrigger>
                        </TabsList>

                        <TabsContent value="informacoes" className="space-y-4 pt-4">
                            <InformationTab form={form} />
                        </TabsContent>

                        <TabsContent value="contato" className="space-y-4 pt-4">
                            <ContactTab form={form} />
                        </TabsContent>

                        <TabsContent value="atuacao" className="space-y-4 pt-4">
                            <ActuationTab
                                form={form}
                                initialData={{
                                    areasAtuacao: initialData.areasAtuacao,
                                    formasAjuda: initialData.formasAjuda,
                                }}
                                helpTypes={helpTypes}
                                handleAreaChange={handleAreaChange}
                                handleHelpTypeChange={handleHelpTypeChange}
                            />
                        </TabsContent>

                        <TabsContent value="documentos" className="space-y-4 pt-4">
                            <DocumentsTab
                                form={form}
                                initialData={{
                                    certificacoes: initialData.certificacoes,
                                }}
                                handleCertificationChange={handleCertificationChange}
                            />
                        </TabsContent>
                    </Tabs>

                    <div className="mt-6 flex justify-between">
                        <Button variant="outline" type="button" className="dark:border-gray-700 dark:text-gray-300">
                            Salvar como rascunho
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Enviando..." : "Enviar cadastro"}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="text-sm text-gray-500 dark:text-gray-400">
                <p>
                    Após o envio, seu cadastro será analisado pela nossa equipe e você receberá um e-mail com a confirmação da
                    aprovação.
                </p>
            </CardFooter>
        </Card>
    )
} 