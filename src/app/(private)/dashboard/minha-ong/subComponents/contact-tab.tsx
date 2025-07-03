import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Globe, Facebook, Instagram } from "lucide-react"
import { Organization } from "../types"

interface ContactTabProps {
    organization: Organization
}

export function ContactTab({ organization }: ContactTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
                <CardDescription>Dados de contato e localização da sua organização</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium mb-2">Contato</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">E-mail</p>
                                <p className="text-base">{organization.email}</p>
                            </div>
                        </div>

                        {organization.telefone && (
                            <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Telefone</p>
                                    <p className="text-base">{organization.telefone}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {(organization.site || organization.facebook || organization.instagram) && (
                    <>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-medium mb-2">Redes Sociais</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {organization.site && (
                                    <div className="flex items-center">
                                        <Globe className="h-4 w-4 mr-2 text-gray-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Site</p>
                                            <a
                                                href={organization.site.startsWith("http") ? organization.site : `https://${organization.site}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                {organization.site}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {organization.facebook && (
                                    <div className="flex items-center">
                                        <Facebook className="h-4 w-4 mr-2 text-gray-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Facebook</p>
                                            <a
                                                href={organization.facebook.startsWith("http") ? organization.facebook : `https://${organization.facebook}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                {organization.facebook}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {organization.instagram && (
                                    <div className="flex items-center">
                                        <Instagram className="h-4 w-4 mr-2 text-gray-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Instagram</p>
                                            <a
                                                href={organization.instagram.startsWith("http") ? organization.instagram : `https://${organization.instagram}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                {organization.instagram}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {organization.endereco && (
                    <>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-medium mb-2">Endereço</h3>
                            <div className="flex items-start">
                                <MapPin className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                                <div>
                                    <p className="text-base">{organization.endereco}</p>
                                    <p className="text-base">
                                        {organization.cidade} - {organization.estado} {organization.cep && `CEP: ${organization.cep}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <Separator />
                <div>
                    <h3 className="text-lg font-medium mb-2">Responsável</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</p>
                            <p className="text-base">{organization.responsavel}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cargo</p>
                            <p className="text-base">{organization.cargo_responsavel}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 