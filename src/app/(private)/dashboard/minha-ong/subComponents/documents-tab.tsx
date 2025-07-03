import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Certification } from "../types"

interface DocumentsTabProps {
    organization: any
    certifications: Certification[]
}

export function DocumentsTab({ organization, certifications }: DocumentsTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Documentos e Certificações</CardTitle>
                <CardDescription>Documentos e certificações da sua organização</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {organization.cnpj && (
                    <div>
                        <h3 className="text-lg font-medium mb-2">CNPJ</h3>
                        <p className="text-base">{organization.cnpj}</p>
                    </div>
                )}

                {certifications.length > 0 && (
                    <>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-medium mb-2">Certificações</h3>
                            <div className="flex flex-wrap gap-2">
                                {certifications.map((cert) => (
                                    <Badge key={cert.id} variant="outline">
                                        {cert.nome}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
} 