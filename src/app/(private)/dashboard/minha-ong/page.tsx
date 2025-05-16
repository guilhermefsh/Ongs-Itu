"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    AlertCircle,
    CheckCircle,
    Clock,
    Edit,
    ExternalLink,
    MapPin,
    Phone,
    Mail,
    Globe,
    Facebook,
    Instagram,
    ImageIcon,
} from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Area, AreaResponse, Certification, CertificationResponse, HelpForm, HelpFormResponse, Organization } from "./types"



export default function MinhaOngPage() {
    const router = useRouter()
    const supabase = getSupabaseClient()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [organization, setOrganization] = useState<Organization | null>(null)
    const [areas, setAreas] = useState<Area[]>([])
    const [helpForms, setHelpForms] = useState<HelpForm[]>([])
    const [certifications, setCertifications] = useState<Certification[]>([])
    const [galleryImages, setGalleryImages] = useState<string[]>([])

    useEffect(() => {
        const fetchOrganizationData = async () => {
            try {
                setLoading(true)

                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser()

                if (userError) {
                    throw new Error("Erro ao buscar usuário: " + userError.message)
                }

                if (!user) {
                    router.push("/auth/login")
                    return
                }

                const { data: orgData, error: orgError } = await supabase
                    .from("ongs")
                    .select("*")
                    .eq("user_id", user.id)
                    .single()

                if (orgError && orgError.code !== "PGRST116") {
                    throw new Error("Erro ao buscar dados da ONG: " + orgError.message)
                }

                if (!orgData) {
                    setOrganization(null)
                    setLoading(false)
                    return
                }

                setOrganization(orgData)

                const { data: galleryData, error: galleryError } = await supabase
                    .from("ong_imagens")
                    .select("url")
                    .eq("ong_id", orgData.id)
                    .order("ordem", { ascending: true })

                if (galleryError) {
                    console.error("Erro ao buscar galeria de imagens:", galleryError)
                } else if (galleryData) {
                    setGalleryImages(galleryData.map((item) => item.url))
                }

                const { data: areasData, error: areasError } = await supabase
                    .from("ong_areas_atuacao")
                    .select(`
                        area_id,
                        areas_atuacao (
                            id,
                            nome
                        )
                    `)
                    .eq("ong_id", orgData.id)

                if (areasError) {
                    console.error("Erro ao buscar áreas de atuação:", areasError)
                } else if (areasData) {
                    const typedAreasData = areasData as unknown as AreaResponse[]
                    setAreas(typedAreasData.map((item) => ({
                        id: item.areas_atuacao.id,
                        nome: item.areas_atuacao.nome
                    })))
                }

                const { data: formsData, error: formsError } = await supabase
                    .from("ong_formas_ajuda")
                    .select(`
                        forma_id,
                        descricao,
                        formas_ajuda (
                            id,
                            nome
                        )
                    `)
                    .eq("ong_id", orgData.id)

                if (formsError) {
                    console.error("Erro ao buscar formas de ajuda:", formsError)
                } else if (formsData) {
                    const typedFormsData = formsData as unknown as HelpFormResponse[]
                    setHelpForms(typedFormsData.map((item) => ({
                        id: item.formas_ajuda.id,
                        nome: item.formas_ajuda.nome,
                        descricao: item.descricao
                    })))
                }

                const { data: certData, error: certError } = await supabase
                    .from("ong_certificacoes")
                    .select(`
                        certificacao_id,
                        certificacoes (
                            id,
                            nome
                        )
                    `)
                    .eq("ong_id", orgData.id)

                if (certError) {
                    console.error("Erro ao buscar certificações:", certError)
                } else if (certData) {
                    const typedCertData = certData as unknown as CertificationResponse[]
                    setCertifications(typedCertData.map((item) => ({
                        id: item.certificacoes[0].id,
                        nome: item.certificacoes[0].nome
                    })))
                }
            } catch (error: any) {
                setError(error.message)
                console.error("Erro ao buscar dados:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchOrganizationData()
    }, [router, supabase])

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "aprovado":
                return (
                    <Badge variant="success" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Aprovado
                    </Badge>
                )
            case "pendente":
                return (
                    <Badge variant="warning" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Pendente
                    </Badge>
                )
            case "rejeitado":
                return (
                    <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Rejeitado
                    </Badge>
                )
            default:
                return (
                    <Badge variant="outline" className="flex items-center gap-1">
                        {status}
                    </Badge>
                )
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto py-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
                        <p className="text-gray-500 dark:text-gray-400">Carregando dados da ONG...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto py-6">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erro</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        )
    }

    if (!organization) {
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
                        <Button onClick={() => router.push("/dashboard/cadastrar-ong")}>Cadastrar ONG</Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight dark:text-gray-100">{organization.nome}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Status: {getStatusBadge(organization.status)}</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Button variant="outline" className="mr-2" onClick={() => router.push(`/ongs/${organization.id}`)}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ver página pública
                    </Button>
                    <Button onClick={() => router.push("/dashboard/editar-ong")}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar ONG
                    </Button>
                </div>
            </div>

            {organization.status === "pendente" && (
                <Alert className="mb-6 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800">
                    <Clock className="h-4 w-4" />
                    <AlertTitle>Cadastro em análise</AlertTitle>
                    <AlertDescription>
                        Seu cadastro está sendo analisado pela nossa equipe. Você receberá um e-mail quando for aprovado.
                    </AlertDescription>
                </Alert>
            )}

            {organization.status === "rejeitado" && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Cadastro rejeitado</AlertTitle>
                    <AlertDescription>
                        Seu cadastro foi rejeitado. Entre em contato conosco para mais informações.
                    </AlertDescription>
                </Alert>
            )}

            <Tabs defaultValue="informacoes" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                    <TabsTrigger value="informacoes">Informações</TabsTrigger>
                    <TabsTrigger value="imagens">Imagens</TabsTrigger>
                    <TabsTrigger value="contato">Contato</TabsTrigger>
                    <TabsTrigger value="atuacao">Atuação</TabsTrigger>
                    <TabsTrigger value="documentos">Documentos</TabsTrigger>
                </TabsList>

                <TabsContent value="informacoes">
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
                </TabsContent>

                <TabsContent value="imagens">
                    <Card>
                        <CardHeader>
                            <CardTitle>Imagens da ONG</CardTitle>
                            <CardDescription>Logo, imagem de capa e galeria de fotos</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {organization.logo_url ? (
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Logo</h3>
                                    <div className="relative h-40 w-40 overflow-hidden rounded-md border border-border">
                                        <Image src={organization.logo_url || "/placeholder.svg"} alt="Logo da ONG" fill className="object-contain" />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Logo</h3>
                                    <div className="flex h-40 w-40 items-center justify-center rounded-md border border-dashed border-border bg-muted">
                                        <div className="flex flex-col items-center text-muted-foreground">
                                            <ImageIcon className="h-10 w-10 mb-2" />
                                            <span className="text-sm">Nenhuma logo</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Separator />

                            {organization.imagem_capa_url ? (
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Imagem de Capa</h3>
                                    <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border">
                                        <Image
                                            src={organization.imagem_capa_url || "/placeholder.svg"}
                                            alt="Imagem de capa"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Imagem de Capa</h3>
                                    <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-border bg-muted">
                                        <div className="flex flex-col items-center text-muted-foreground">
                                            <ImageIcon className="h-10 w-10 mb-2" />
                                            <span className="text-sm">Nenhuma imagem de capa</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Separator />

                            <div>
                                <h3 className="text-lg font-medium mb-2">Galeria de Imagens</h3>
                                {galleryImages.length > 0 ? (
                                    <Carousel className="w-full">
                                        <CarouselContent>
                                            {galleryImages.map((imagem, index) => (
                                                <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                                                    <div className="relative aspect-video overflow-hidden rounded-md border border-border p-1">
                                                        <Image
                                                            src={imagem || "/placeholder.svg"}
                                                            alt={`Imagem ${index + 1}`}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="left-2" />
                                        <CarouselNext className="right-2" />
                                    </Carousel>
                                ) : (
                                    <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-border bg-muted">
                                        <div className="flex flex-col items-center text-muted-foreground">
                                            <ImageIcon className="h-10 w-10 mb-2" />
                                            <span className="text-sm">Nenhuma imagem na galeria</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="contato">
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
                </TabsContent>

                <TabsContent value="atuacao">
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
                </TabsContent>

                <TabsContent value="documentos">
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
                </TabsContent>
            </Tabs>
        </div>
    )
}
