import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Area, HelpForm } from "../types"

interface ActuationTabProps {
    areas: Area[]
    helpForms: HelpForm[]
}

export function ActuationTab({ areas, helpForms }: ActuationTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Áreas de Atuação</CardTitle>
                <CardDescription>Como sua organização atua e como as pessoas podem ajudar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {areas.length > 0 && (
                    <div>
                        <h3 className="text-lg font-medium mb-2">Áreas de Atuação</h3>
                        <div className="flex flex-wrap gap-2">
                            {areas.map((area) => (
                                <Badge key={area.id} variant="outline">
                                    {area.nome}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {helpForms.length > 0 && (
                    <>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-medium mb-2">Formas de Ajuda</h3>
                            <div className="space-y-4">
                                {helpForms.map((forma) => (
                                    <div key={forma.id}>
                                        <h4 className="font-medium">{forma.nome}</h4>
                                        {forma.descricao && (
                                            <p className="text-gray-600 dark:text-gray-300 mt-1">{forma.descricao}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
} 