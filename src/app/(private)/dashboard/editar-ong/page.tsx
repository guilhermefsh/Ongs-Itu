"use client"

import type React from "react"
import { useState, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/ui/image-upload"
import { MultiImageUpload } from "@/components/ui/multi-image-upload"
import { editOngSchema, type EditOngFormData } from "./schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

export default function EditONGPage() {
    const router = useRouter()
    const supabase = getSupabaseClient()
    const [isPending, startTransition] = useTransition()

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [ongId, setOngId] = useState<string | null>(null)
    const [areasOfActionOptions, setAreasOfActionOptions] = useState<{ id: number; name: string }[]>([])
    const [helpTypesOptions, setHelpTypesOptions] = useState<{ id: number; name: string }[]>([])
    const [certificationsOptions, setCertificationsOptions] = useState<{ id: number; name: string }[]>([])

    const form = useForm<EditOngFormData>({
        resolver: zodResolver(editOngSchema),
        defaultValues: {
            name: "",
            tradeName: "",
            shortDescription: "",
            fullDescription: "",
            foundingYear: "",
            mainCause: "",
            targetAudience: "",
            email: "",
            phone: "",
            website: "",
            facebook: "",
            instagram: "",
            address: "",
            city: "Itu",
            state: "SP",
            zipCode: "",
            responsibleName: "",
            responsibleRole: "",
            logoUrl: null,
            coverImageUrl: null,
            galleryImages: [],
            areasOfAction: [],
            helpTypes: [],
            volunteerDescription: "",
            donationDescription: "",
            partnershipDescription: "",
            cnpj: "",
            certifications: []
        }
    })

    useEffect(() => {
        const fetchOngData = async () => {
            try {
                startTransition(async () => {
                    const { data: { user }, error: userError } = await supabase.auth.getUser()

                    if (userError) throw new Error("Erro ao buscar usuário: " + userError.message)
                    if (!user) {
                        router.push("/auth/login")
                        return
                    }

                    const { data: ongData, error: ongError } = await supabase
                        .from("ongs")
                        .select("*")
                        .eq("user_id", user.id)
                        .single()

                    if (ongError) {
                        if (ongError.code === "PGRST116") {
                            router.push("/dashboard/cadastrar-ong")
                            return
                        }
                        throw new Error("Erro ao buscar dados da ONG: " + ongError.message)
                    }

                    if (!ongData) {
                        router.push("/dashboard/cadastrar-ong")
                        return
                    }

                    setOngId(ongData.id)

                    const { data: galeriaData } = await supabase
                        .from("ong_imagens")
                        .select("url")
                        .eq("ong_id", ongData.id)
                        .order("ordem", { ascending: true })

                    const { data: areasData } = await supabase
                        .from("areas_atuacao")
                        .select("id, nome")
                        .order("nome")

                    const { data: ongAreasData } = await supabase
                        .from("ong_areas_atuacao")
                        .select("area_id")
                        .eq("ong_id", ongData.id)

                    const { data: formasData } = await supabase
                        .from("formas_ajuda")
                        .select("id, nome")
                        .order("nome")

                    const { data: ongFormasData } = await supabase
                        .from("ong_formas_ajuda")
                        .select("forma_id, descricao")
                        .eq("ong_id", ongData.id)

                    const { data: certData } = await supabase
                        .from("certificacoes")
                        .select("id, nome")
                        .order("nome")

                    const { data: ongCertData } = await supabase
                        .from("ong_certificacoes")
                        .select("certificacao_id")
                        .eq("ong_id", ongData.id)

                    form.reset({
                        name: ongData.nome || "",
                        tradeName: ongData.nome_fantasia || "",
                        shortDescription: ongData.descricao_curta || "",
                        fullDescription: ongData.descricao_completa || "",
                        foundingYear: ongData.ano_fundacao?.toString() || "",
                        mainCause: ongData.causa || "",
                        targetAudience: ongData.publico_alvo || "",
                        email: ongData.email || "",
                        phone: ongData.telefone || "",
                        website: ongData.site || "",
                        facebook: ongData.facebook || "",
                        instagram: ongData.instagram || "",
                        address: ongData.endereco || "",
                        city: ongData.cidade || "Itu",
                        state: ongData.estado || "SP",
                        zipCode: ongData.cep || "",
                        responsibleName: ongData.responsavel || "",
                        responsibleRole: ongData.cargo_responsavel || "",
                        logoUrl: ongData.logo_url,
                        coverImageUrl: ongData.imagem_capa_url,
                        galleryImages: galeriaData?.map(item => item.url) || [],
                        areasOfAction: ongAreasData?.map(item => item.area_id) || [],
                        helpTypes: ongFormasData?.map(item => item.forma_id) || [],
                        volunteerDescription: ongFormasData?.find(item => item.forma_id === 1)?.descricao || "",
                        donationDescription: ongFormasData?.find(item => item.forma_id === 2)?.descricao || "",
                        partnershipDescription: ongFormasData?.find(item => item.forma_id === 6)?.descricao || "",
                        cnpj: ongData.cnpj || "",
                        certifications: ongCertData?.map(item => item.certificacao_id) || []
                    })

                    if (areasData) setAreasOfActionOptions(areasData.map(item => ({ id: item.id, name: item.nome })))
                    if (formasData) setHelpTypesOptions(formasData.map(item => ({ id: item.id, name: item.nome })))
                    if (certData) setCertificationsOptions(certData.map(item => ({ id: item.id, name: item.nome })))
                })
            } catch (error: any) {
                setError(error.message)
                console.error("Erro ao buscar dados:", error)
            }
        }

        fetchOngData()
    }, [router, supabase, form])

    const onSubmit = async (data: EditOngFormData) => {
        if (!ongId) {
            setError("ID da ONG não encontrado")
            return
        }

        setSaving(true)
        setError(null)

        try {
            const { error: ongError } = await supabase
                .from("ongs")
                .update({
                    nome: data.name,
                    descricao_curta: data.shortDescription,
                    descricao_completa: data.fullDescription,
                    ano_fundacao: Number.parseInt(data.foundingYear),
                    causa: data.mainCause,
                    publico_alvo: data.targetAudience || null,
                    logo_url: data.logoUrl,
                    imagem_capa_url: data.coverImageUrl,
                    endereco: data.address || null,
                    cidade: data.city,
                    estado: data.state,
                    cep: data.zipCode || null,
                    telefone: data.phone || null,
                    email: data.email,
                    site: data.website || null,
                    facebook: data.facebook || null,
                    instagram: data.instagram || null,
                    cnpj: data.cnpj || null,
                    responsavel: data.responsibleName,
                    cargo_responsavel: data.responsibleRole,
                })
                .eq("id", ongId)

            if (ongError) throw ongError

            await supabase.from("ong_imagens").delete().eq("ong_id", ongId)

            if (data.galleryImages.length > 0) {
                const imagesInsert = data.galleryImages.map((url, index) => ({
                    ong_id: ongId,
                    url,
                    ordem: index,
                }))

                const { error: imagesError } = await supabase.from("ong_imagens").insert(imagesInsert)
                if (imagesError) throw imagesError
            }

            await supabase.from("ong_areas_atuacao").delete().eq("ong_id", ongId)

            if (data.areasOfAction.length > 0) {
                const areasInsert = data.areasOfAction.map(areaId => ({
                    ong_id: ongId,
                    area_id: areaId,
                }))

                const { error: areasError } = await supabase.from("ong_areas_atuacao").insert(areasInsert)
                if (areasError) throw areasError
            }

            await supabase.from("ong_formas_ajuda").delete().eq("ong_id", ongId)

            if (data.helpTypes.length > 0) {
                const formasInsert = data.helpTypes.map(formaId => ({
                    ong_id: ongId,
                    forma_id: formaId,
                    descricao: formaId === 1 ? data.volunteerDescription :
                        formaId === 2 ? data.donationDescription :
                            formaId === 6 ? data.partnershipDescription : null
                }))

                const { error: formasError } = await supabase.from("ong_formas_ajuda").insert(formasInsert)
                if (formasError) throw formasError
            }

            await supabase.from("ong_certificacoes").delete().eq("ong_id", ongId)

            if (data.certifications.length > 0) {
                const certInsert = data.certifications.map(certId => ({
                    ong_id: ongId,
                    certificacao_id: certId,
                }))

                const { error: certError } = await supabase.from("ong_certificacoes").insert(certInsert)
                if (certError) throw certError
            }

            setSuccess(true)
            setTimeout(() => {
                router.push("/dashboard/minha-ong")
            }, 3000)
        } catch (error: any) {
            setError(error.message || "Erro ao atualizar ONG. Tente novamente.")
        } finally {
            setSaving(false)
        }
    }

    if (isPending) {
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

    if (success) {
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
                                    <div className="space-y-4">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nome da ONG *</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Nome oficial da organização" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="tradeName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nome Fantasia</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Nome pelo qual a ONG é conhecida (se diferente)" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="shortDescription"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Descrição Curta *</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Breve descrição da ONG (até 150 caracteres)"
                                                            maxLength={150}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="fullDescription"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Descrição Completa *</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Descreva detalhadamente o trabalho da sua ONG, sua história, missão e valores"
                                                            className="min-h-[150px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="foundingYear"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Ano de Fundação *</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="Ex: 2010"
                                                                min="1900"
                                                                max={new Date().getFullYear()}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="mainCause"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Causa Principal *</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecione a causa principal" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="Educação">Educação</SelectItem>
                                                                <SelectItem value="Saúde">Saúde</SelectItem>
                                                                <SelectItem value="Meio Ambiente">Meio Ambiente</SelectItem>
                                                                <SelectItem value="Crianças">Crianças</SelectItem>
                                                                <SelectItem value="Idosos">Idosos</SelectItem>
                                                                <SelectItem value="Mulheres">Mulheres</SelectItem>
                                                                <SelectItem value="Animais">Animais</SelectItem>
                                                                <SelectItem value="Cultura">Cultura e Arte</SelectItem>
                                                                <SelectItem value="Esporte">Esporte</SelectItem>
                                                                <SelectItem value="Direitos Humanos">Direitos Humanos</SelectItem>
                                                                <SelectItem value="Assistência Social">Assistência Social</SelectItem>
                                                                <SelectItem value="Outra">Outra</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="targetAudience"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Público Alvo</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Descreva o público-alvo da sua ONG"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="imagens" className="space-y-6 pt-4">
                                    <div className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="logoUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Logo da ONG</FormLabel>
                                                    <FormControl>
                                                        <ImageUpload
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            bucketName="ongs"
                                                            folderPath={`${ongId}/logo`}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="coverImageUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Imagem de Capa</FormLabel>
                                                    <FormControl>
                                                        <ImageUpload
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            bucketName="ongs"
                                                            folderPath={`${ongId}/capa`}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="galleryImages"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Galeria de Imagens</FormLabel>
                                                    <FormControl>
                                                        <MultiImageUpload
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            bucketName="ongs"
                                                            folderPath={`${ongId}/galeria`}
                                                            maxImages={10}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="contato" className="space-y-4 pt-4">
                                    <div className="space-y-4">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>E-mail *</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="email"
                                                                placeholder="contato@suaong.org.br"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Telefone</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="(11) 99999-9999"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="website"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Site</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="url"
                                                            placeholder="https://www.suaong.org.br"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="facebook"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Facebook</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="facebook.com/suaong"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="instagram"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Instagram</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="instagram.com/suaong"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Endereço</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Endereço completo"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid gap-2 sm:grid-cols-3">
                                            <FormField
                                                control={form.control}
                                                name="city"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Cidade"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="state"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Estado"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="zipCode"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="CEP"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="responsibleName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome do Responsável *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Nome completo do responsável pela ONG"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="responsibleRole"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Cargo do Responsável *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Ex: Presidente, Diretor, Coordenador"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="atuacao" className="space-y-4 pt-4">
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="areasOfAction"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Áreas de Atuação *</FormLabel>
                                                    <div className="grid gap-2 sm:grid-cols-2">
                                                        {areasOfActionOptions.map((area) => (
                                                            <div key={area.id} className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={`area-${area.id}`}
                                                                    checked={field.value.includes(area.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        const newValue = checked
                                                                            ? [...field.value, area.id]
                                                                            : field.value.filter((id) => id !== area.id)
                                                                        field.onChange(newValue)
                                                                    }}
                                                                />
                                                                <label
                                                                    htmlFor={`area-${area.id}`}
                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                                                                >
                                                                    {area.name}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="helpTypes"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Formas de Ajuda Aceitas</FormLabel>
                                                    <div className="grid gap-2 sm:grid-cols-2">
                                                        {helpTypesOptions.map((forma) => (
                                                            <div key={forma.id} className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={`forma-${forma.id}`}
                                                                    checked={field.value.includes(forma.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        const newValue = checked
                                                                            ? [...field.value, forma.id]
                                                                            : field.value.filter((id) => id !== forma.id)
                                                                        field.onChange(newValue)
                                                                    }}
                                                                />
                                                                <label
                                                                    htmlFor={`forma-${forma.id}`}
                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                                                                >
                                                                    {forma.name}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {form.watch("helpTypes").includes(1) && (
                                            <FormField
                                                control={form.control}
                                                name="volunteerDescription"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Como ajudar - Voluntariado</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Descreva como as pessoas podem ajudar como voluntárias"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                        {form.watch("helpTypes").some((id) => [2, 3, 4, 5].includes(id)) && (
                                            <FormField
                                                control={form.control}
                                                name="donationDescription"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Como ajudar - Doações</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Descreva como as pessoas podem ajudar com doações"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                        {form.watch("helpTypes").includes(6) && (
                                            <FormField
                                                control={form.control}
                                                name="partnershipDescription"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Como ajudar - Parcerias</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Descreva como empresas podem estabelecer parcerias"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="documentos" className="space-y-4 pt-4">
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="cnpj"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CNPJ</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="00.000.000/0000-00"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="certifications"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Certificações e Títulos</FormLabel>
                                                    <div className="grid gap-2 sm:grid-cols-2">
                                                        {certificationsOptions.map((cert) => (
                                                            <div key={cert.id} className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={`cert-${cert.id}`}
                                                                    checked={field.value.includes(cert.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        const newValue = checked
                                                                            ? [...field.value, cert.id]
                                                                            : field.value.filter((id) => id !== cert.id)
                                                                        field.onChange(newValue)
                                                                    }}
                                                                />
                                                                <label
                                                                    htmlFor={`cert-${cert.id}`}
                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                                                                >
                                                                    {cert.name}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <div className="mt-6 flex justify-between">
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="dark:border-gray-700 dark:text-gray-300"
                                    onClick={() => router.push("/dashboard/minha-ong")}
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
