import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Form } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"
import { EditOngFormData } from "../schema"
import { InformationTab } from "./information-tab"
import { ImagesTab } from "./images-tab"
import { ContactTab } from "./contact-tab"
import { ActuationTab } from "./actuation-tab"
import { DocumentsTab } from "./documents-tab"
import { AreaOfAction, HelpType, Certification } from "@/hooks/use-edit-ong"

interface EditFormProps {
    form: UseFormReturn<EditOngFormData>
    error: string | null
    saving: boolean
    ongId: string | null
    areasOfActionOptions: AreaOfAction[]
    helpTypesOptions: HelpType[]
    certificationsOptions: Certification[]
    onSubmit: (data: EditOngFormData) => void
    onCancel: () => void
}

export function EditForm({
    form,
    error,
    saving,
    ongId,
    areasOfActionOptions,
    helpTypesOptions,
    certificationsOptions,
    onSubmit,
    onCancel
}: EditFormProps) {
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="mb-6 text-2xl font-bold tracking-tight dark:text-gray-100">Editar ONG</h1>

            <Card className="dark:border-gray-800 dark:bg-gray-950">
                <CardHeader>
                    <CardTitle className="dark:text-gray-100">Informações da ONG</CardTitle>
                    <CardDescription className="dark:text-gray-400">Atualize os dados da sua organização.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {error && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <Tabs defaultValue="informacoes" className="w-full">
                                <TabsList className="grid w-full grid-cols-5">
                                    <TabsTrigger value="informacoes">Informações</TabsTrigger>
                                    <TabsTrigger value="imagens">Imagens</TabsTrigger>
                                    <TabsTrigger value="contato">Contato</TabsTrigger>
                                    <TabsTrigger value="atuacao">Atuação</TabsTrigger>
                                    <TabsTrigger value="documentos">Documentos</TabsTrigger>
                                </TabsList>

                                <TabsContent value="informacoes" className="space-y-4 pt-4">
                                    <InformationTab form={form} />
                                </TabsContent>

                                <TabsContent value="imagens" className="space-y-6 pt-4">
                                    <ImagesTab form={form} ongId={ongId} />
                                </TabsContent>

                                <TabsContent value="contato" className="space-y-4 pt-4">
                                    <ContactTab form={form} />
                                </TabsContent>

                                <TabsContent value="atuacao" className="space-y-4 pt-4">
                                    <ActuationTab
                                        form={form}
                                        areasOfActionOptions={areasOfActionOptions}
                                        helpTypesOptions={helpTypesOptions}
                                    />
                                </TabsContent>

                                <TabsContent value="documentos" className="space-y-4 pt-4">
                                    <DocumentsTab
                                        form={form}
                                        certificationsOptions={certificationsOptions}
                                    />
                                </TabsContent>
                            </Tabs>

                            <div className="mt-6 flex justify-between">
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="dark:border-gray-700 dark:text-gray-300"
                                    onClick={onCancel}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={saving}>
                                    {saving ? "Salvando..." : "Salvar alterações"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
} 