import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Organization } from "../types"

interface InformationTabProps {
    organization: Organization
}

export function InformationTab({ organization }: InformationTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Informações da ONG</CardTitle>
                <CardDescription>Dados básicos da sua organização</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium mb-2">Identificação</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</p>
                            <p className="text-base">{organization.nome}</p>
                        </div>
                        {organization.nome_fantasia && (
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome Fantasia</p>
                                <p className="text-base">{organization.nome_fantasia}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ano de Fundação</p>
                            <p className="text-base">{organization.ano_fundacao}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Causa Principal</p>
                            <p className="text-base">{organization.causa}</p>
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="text-lg font-medium mb-2">Descrição</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Descrição Curta</p>
                            <p className="text-base">{organization.descricao_curta}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Descrição Completa</p>
                            <p className="text-base whitespace-pre-line">{organization.descricao_completa}</p>
                        </div>
                    </div>
                </div>

                {organization.publico_alvo && (
                    <>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-medium mb-2">Público Alvo</h3>
                            <p className="text-base">{organization.publico_alvo}</p>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
} 