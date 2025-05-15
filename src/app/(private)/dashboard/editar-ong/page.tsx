"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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

export default function EditONGPage() {
    const router = useRouter()
    const supabase = getSupabaseClient()

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [ongId, setOngId] = useState<string | null>(null)

    // Dados da ONG
    const [nome, setNome] = useState("")
    const [nomeFantasia, setNomeFantasia] = useState("")
    const [descricaoCurta, setDescricaoCurta] = useState("")
    const [descricaoCompleta, setDescricaoCompleta] = useState("")
    const [anoFundacao, setAnoFundacao] = useState("")
    const [causa, setCausa] = useState("")
    const [publicoAlvo, setPublicoAlvo] = useState("")

    // Imagens
    const [logoUrl, setLogoUrl] = useState<string | null>(null)
    const [imagemCapaUrl, setImagemCapaUrl] = useState<string | null>(null)
    const [galeriaImagens, setGaleriaImagens] = useState<string[]>([])

    // Contato
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [site, setSite] = useState("")
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [endereco, setEndereco] = useState("")
    const [cidade, setCidade] = useState("Itu")
    const [estado, setEstado] = useState("SP")
    const [cep, setCep] = useState("")
    const [responsavel, setResponsavel] = useState("")
    const [cargoResponsavel, setCargoResponsavel] = useState("")

    // Áreas de atuação
    const [areasAtuacao, setAreasAtuacao] = useState<number[]>([])
    const [areasAtuacaoOptions, setAreasAtuacaoOptions] = useState<{ id: number; nome: string }[]>([])

    // Formas de ajuda
    const [formasAjuda, setFormasAjuda] = useState<number[]>([])
    const [formasAjudaOptions, setFormasAjudaOptions] = useState<{ id: number; nome: string }[]>([])
    const [descricaoVoluntariado, setDescricaoVoluntariado] = useState("")
    const [descricaoDoacao, setDescricaoDoacao] = useState("")
    const [descricaoParceria, setDescricaoParceria] = useState("")

    // Documentos
    const [cnpj, setCnpj] = useState("")
    const [certificacoes, setCertificacoes] = useState<number[]>([])
    const [certificacoesOptions, setCertificacoesOptions] = useState<{ id: number; nome: string }[]>([])

    // Buscar dados da ONG e opções para selects
    useEffect(() => {
        const fetchOngData = async () => {
            try {
                setLoading(true)

                // Buscar usuário atual
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

                // Buscar ONG do usuário
                const { data: ongData, error: ongError } = await supabase
                    .from("ongs")
                    .select("*")
                    .eq("user_id", user.id)
                    .single()

                if (ongError) {
                    if (ongError.code === "PGRST116") {
                        // Nenhum resultado encontrado
                        router.push("/dashboard/cadastrar-ong")
                        return
                    }
                    throw new Error("Erro ao buscar dados da ONG: " + ongError.message)
                }

                if (!ongData) {
                    router.push("/dashboard/cadastrar-ong")
                    return
                }

                // Preencher os dados da ONG
                setOngId(ongData.id)
                setNome(ongData.nome || "")
                setNomeFantasia(ongData.nome_fantasia || "")
                setDescricaoCurta(ongData.descricao_curta || "")
                setDescricaoCompleta(ongData.descricao_completa || "")
                setAnoFundacao(ongData.ano_fundacao?.toString() || "")
                setCausa(ongData.causa || "")
                setPublicoAlvo(ongData.publico_alvo || "")
                setLogoUrl(ongData.logo_url)
                setImagemCapaUrl(ongData.imagem_capa_url)

                // Buscar galeria de imagens
                const { data: galeriaData, error: galeriaError } = await supabase
                    .from("ong_imagens")
                    .select("url")
                    .eq("ong_id", ongData.id)
                    .order("ordem", { ascending: true })

                if (galeriaError) {
                    console.error("Erro ao buscar galeria de imagens:", galeriaError)
                } else if (galeriaData) {
                    setGaleriaImagens(galeriaData.map((item) => item.url))
                }

                setEmail(ongData.email || "")
                setTelefone(ongData.telefone || "")
                setSite(ongData.site || "")
                setFacebook(ongData.facebook || "")
                setInstagram(ongData.instagram || "")

                // Processar endereço
                if (ongData.endereco) {
                    setEndereco(ongData.endereco)
                }

                setCidade(ongData.cidade || "Itu")
                setEstado(ongData.estado || "SP")
                setCep(ongData.cep || "")

                setResponsavel(ongData.responsavel || "")
                setCargoResponsavel(ongData.cargo_responsavel || "")

                setCnpj(ongData.cnpj || "")

                // Buscar áreas de atuação
                const { data: areasData, error: areasOptionsError } = await supabase
                    .from("areas_atuacao")
                    .select("id, nome")
                    .order("nome")

                if (areasOptionsError) {
                    console.error("Erro ao buscar áreas de atuação:", areasOptionsError)
                } else if (areasData) {
                    setAreasAtuacaoOptions(areasData)
                }

                // Buscar áreas de atuação da ONG
                const { data: ongAreasData, error: ongAreasError } = await supabase
                    .from("ong_areas_atuacao")
                    .select("area_id")
                    .eq("ong_id", ongData.id)

                if (ongAreasError) {
                    console.error("Erro ao buscar áreas de atuação da ONG:", ongAreasError)
                } else if (ongAreasData) {
                    setAreasAtuacao(ongAreasData.map((item) => item.area_id))
                }

                // Buscar formas de ajuda
                const { data: formasData, error: formasOptionsError } = await supabase
                    .from("formas_ajuda")
                    .select("id, nome")
                    .order("nome")

                if (formasOptionsError) {
                    console.error("Erro ao buscar formas de ajuda:", formasOptionsError)
                } else if (formasData) {
                    setFormasAjudaOptions(formasData)
                }

                // Buscar formas de ajuda da ONG
                const { data: ongFormasData, error: ongFormasError } = await supabase
                    .from("ong_formas_ajuda")
                    .select("forma_id, descricao")
                    .eq("ong_id", ongData.id)

                if (ongFormasError) {
                    console.error("Erro ao buscar formas de ajuda da ONG:", ongFormasError)
                } else if (ongFormasData) {
                    setFormasAjuda(ongFormasData.map((item) => item.forma_id))

                    // Preencher descrições específicas
                    ongFormasData.forEach((item) => {
                        if (item.forma_id === 1 && item.descricao) {
                            // Voluntariado
                            setDescricaoVoluntariado(item.descricao)
                        } else if (item.forma_id === 2 && item.descricao) {
                            // Doação Financeira
                            setDescricaoDoacao(item.descricao)
                        } else if (item.forma_id === 6 && item.descricao) {
                            // Parcerias
                            setDescricaoParceria(item.descricao)
                        }
                    })
                }

                // Buscar certificações
                const { data: certData, error: certOptionsError } = await supabase
                    .from("certificacoes")
                    .select("id, nome")
                    .order("nome")

                if (certOptionsError) {
                    console.error("Erro ao buscar certificações:", certOptionsError)
                } else if (certData) {
                    setCertificacoesOptions(certData)
                }

                // Buscar certificações da ONG
                const { data: ongCertData, error: ongCertError } = await supabase
                    .from("ong_certificacoes")
                    .select("certificacao_id")
                    .eq("ong_id", ongData.id)

                if (ongCertError) {
                    console.error("Erro ao buscar certificações da ONG:", ongCertError)
                } else if (ongCertData) {
                    setCertificacoes(ongCertData.map((item) => item.certificacao_id))
                }
            } catch (error: any) {
                setError(error.message)
                console.error("Erro ao buscar dados:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchOngData()
    }, [router, supabase])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!ongId) {
            setError("ID da ONG não encontrado")
            return
        }

        setSaving(true)
        setError(null)

        try {
            // Atualizar a ONG
            const { error: ongError } = await supabase
                .from("ongs")
                .update({
                    nome,
                    nome_fantasia: nomeFantasia || null,
                    descricao_curta: descricaoCurta,
                    descricao_completa: descricaoCompleta,
                    ano_fundacao: Number.parseInt(anoFundacao),
                    causa,
                    publico_alvo: publicoAlvo || null,
                    logo_url: logoUrl,
                    imagem_capa_url: imagemCapaUrl,
                    endereco: endereco || null,
                    cidade,
                    estado,
                    cep: cep || null,
                    telefone: telefone || null,
                    email,
                    site: site || null,
                    facebook: facebook || null,
                    instagram: instagram || null,
                    cnpj: cnpj || null,
                    responsavel,
                    cargo_responsavel: cargoResponsavel,
                })
                .eq("id", ongId)

            if (ongError) {
                throw ongError
            }

            // Atualizar galeria de imagens
            // Primeiro, remover todas as imagens existentes
            const { error: deleteImagesError } = await supabase.from("ong_imagens").delete().eq("ong_id", ongId)

            if (deleteImagesError) {
                throw deleteImagesError
            }

            // Depois, inserir as novas imagens
            if (galeriaImagens.length > 0) {
                const imagesInsert = galeriaImagens.map((url, index) => ({
                    ong_id: ongId,
                    url,
                    ordem: index,
                }))

                const { error: imagesError } = await supabase.from("ong_imagens").insert(imagesInsert)

                if (imagesError) {
                    throw imagesError
                }
            }

            // Atualizar áreas de atuação
            // Primeiro, remover todas as áreas existentes
            const { error: deleteAreasError } = await supabase.from("ong_areas_atuacao").delete().eq("ong_id", ongId)

            if (deleteAreasError) {
                throw deleteAreasError
            }

            // Depois, inserir as novas áreas
            if (areasAtuacao.length > 0) {
                const areasInsert = areasAtuacao.map((areaId) => ({
                    ong_id: ongId,
                    area_id: areaId,
                }))

                const { error: areasError } = await supabase.from("ong_areas_atuacao").insert(areasInsert)

                if (areasError) {
                    throw areasError
                }
            }

            // Atualizar formas de ajuda
            // Primeiro, remover todas as formas existentes
            const { error: deleteFormasError } = await supabase.from("ong_formas_ajuda").delete().eq("ong_id", ongId)

            if (deleteFormasError) {
                throw deleteFormasError
            }

            // Depois, inserir as novas formas
            if (formasAjuda.length > 0) {
                const formasInsert = formasAjuda.map((formaId) => {
                    let descricao = null

                    // Adicionar descrição específica para cada forma de ajuda
                    if (formaId === 1) {
                        // Voluntariado (assumindo que o ID é 1)
                        descricao = descricaoVoluntariado
                    } else if (formaId === 2) {
                        // Doação Financeira (assumindo que o ID é 2)
                        descricao = descricaoDoacao
                    } else if (formaId === 6) {
                        // Parcerias Empresariais (assumindo que o ID é 6)
                        descricao = descricaoParceria
                    }

                    return {
                        ong_id: ongId,
                        forma_id: formaId,
                        descricao,
                    }
                })

                const { error: formasError } = await supabase.from("ong_formas_ajuda").insert(formasInsert)

                if (formasError) {
                    throw formasError
                }
            }

            // Atualizar certificações
            // Primeiro, remover todas as certificações existentes
            const { error: deleteCertError } = await supabase.from("ong_certificacoes").delete().eq("ong_id", ongId)

            if (deleteCertError) {
                throw deleteCertError
            }

            // Depois, inserir as novas certificações
            if (certificacoes.length > 0) {
                const certInsert = certificacoes.map((certId) => ({
                    ong_id: ongId,
                    certificacao_id: certId,
                }))

                const { error: certError } = await supabase.from("ong_certificacoes").insert(certInsert)

                if (certError) {
                    throw certError
                }
            }

            setSuccess(true)

            // Redirecionar após 3 segundos
            setTimeout(() => {
                router.push("/dashboard/minha-ong")
            }, 3000)
        } catch (error: any) {
            setError(error.message || "Erro ao atualizar ONG. Tente novamente.")
        } finally {
            setSaving(false)
        }
    }

    const toggleAreaAtuacao = (areaId: number) => {
        setAreasAtuacao((prev) => (prev.includes(areaId) ? prev.filter((id) => id !== areaId) : [...prev, areaId]))
    }

    const toggleFormaAjuda = (formaId: number) => {
        setFormasAjuda((prev) => (prev.includes(formaId) ? prev.filter((id) => id !== formaId) : [...prev, formaId]))
    }

    const toggleCertificacao = (certId: number) => {
        setCertificacoes((prev) => (prev.includes(certId) ? prev.filter((id) => id !== certId) : [...prev, certId]))
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
                    <form onSubmit={handleSubmit}>
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

                            {/* Aba de Informações Básicas */}
                            <TabsContent value="informacoes" className="space-y-4 pt-4">
                                <div className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="nome" className="dark:text-gray-200">
                                                Nome da ONG *
                                            </Label>
                                            <Input
                                                id="nome"
                                                placeholder="Nome oficial da organização"
                                                value={nome}
                                                onChange={(e) => setNome(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="nome-fantasia" className="dark:text-gray-200">
                                                Nome Fantasia
                                            </Label>
                                            <Input
                                                id="nome-fantasia"
                                                placeholder="Nome pelo qual a ONG é conhecida (se diferente)"
                                                value={nomeFantasia}
                                                onChange={(e) => setNomeFantasia(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="descricao-curta" className="dark:text-gray-200">
                                            Descrição Curta *
                                        </Label>
                                        <Textarea
                                            id="descricao-curta"
                                            placeholder="Breve descrição da ONG (até 150 caracteres)"
                                            maxLength={150}
                                            value={descricaoCurta}
                                            onChange={(e) => setDescricaoCurta(e.target.value)}
                                            required
                                        />
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Esta descrição será exibida nos cards e resultados de busca.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="descricao-completa" className="dark:text-gray-200">
                                            Descrição Completa *
                                        </Label>
                                        <Textarea
                                            id="descricao-completa"
                                            placeholder="Descreva detalhadamente o trabalho da sua ONG, sua história, missão e valores"
                                            className="min-h-[150px]"
                                            value={descricaoCompleta}
                                            onChange={(e) => setDescricaoCompleta(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="ano-fundacao" className="dark:text-gray-200">
                                                Ano de Fundação *
                                            </Label>
                                            <Input
                                                id="ano-fundacao"
                                                type="number"
                                                placeholder="Ex: 2010"
                                                min="1900"
                                                max={new Date().getFullYear()}
                                                value={anoFundacao}
                                                onChange={(e) => setAnoFundacao(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="causa" className="dark:text-gray-200">
                                                Causa Principal *
                                            </Label>
                                            <Select value={causa} onValueChange={setCausa} required>
                                                <SelectTrigger id="causa">
                                                    <SelectValue placeholder="Selecione a causa principal" />
                                                </SelectTrigger>
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
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="publico-alvo" className="dark:text-gray-200">
                                            Público Alvo
                                        </Label>
                                        <Textarea
                                            id="publico-alvo"
                                            placeholder="Descreva o público-alvo da sua ONG"
                                            value={publicoAlvo}
                                            onChange={(e) => setPublicoAlvo(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Aba de Imagens */}
                            <TabsContent value="imagens" className="space-y-6 pt-4">
                                <div className="space-y-6">
                                    <ImageUpload
                                        value={logoUrl}
                                        onChange={setLogoUrl}
                                        bucketName="ongs"
                                        folderPath={`${ongId}/logo`}
                                        label="Logo da ONG"
                                    />

                                    <ImageUpload
                                        value={imagemCapaUrl}
                                        onChange={setImagemCapaUrl}
                                        bucketName="ongs"
                                        folderPath={`${ongId}/capa`}
                                        label="Imagem de Capa"
                                    />

                                    <MultiImageUpload
                                        value={galeriaImagens}
                                        onChange={setGaleriaImagens}
                                        bucketName="ongs"
                                        folderPath={`${ongId}/galeria`}
                                        label="Galeria de Imagens"
                                        maxImages={10}
                                    />
                                </div>
                            </TabsContent>

                            {/* Aba de Contato */}
                            <TabsContent value="contato" className="space-y-4 pt-4">
                                <div className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="dark:text-gray-200">
                                                E-mail *
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="contato@suaong.org.br"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="telefone" className="dark:text-gray-200">
                                                Telefone
                                            </Label>
                                            <Input
                                                id="telefone"
                                                placeholder="(11) 99999-9999"
                                                value={telefone}
                                                onChange={(e) => setTelefone(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="site" className="dark:text-gray-200">
                                            Site
                                        </Label>
                                        <Input
                                            id="site"
                                            type="url"
                                            placeholder="https://www.suaong.org.br"
                                            value={site}
                                            onChange={(e) => setSite(e.target.value)}
                                        />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="facebook" className="dark:text-gray-200">
                                                Facebook
                                            </Label>
                                            <Input
                                                id="facebook"
                                                placeholder="facebook.com/suaong"
                                                value={facebook}
                                                onChange={(e) => setFacebook(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="instagram" className="dark:text-gray-200">
                                                Instagram
                                            </Label>
                                            <Input
                                                id="instagram"
                                                placeholder="instagram.com/suaong"
                                                value={instagram}
                                                onChange={(e) => setInstagram(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="dark:text-gray-200">Endereço</Label>
                                        <Input
                                            placeholder="Endereço completo"
                                            value={endereco}
                                            onChange={(e) => setEndereco(e.target.value)}
                                        />
                                        <div className="grid gap-2 sm:grid-cols-3">
                                            <Input
                                                placeholder="Cidade"
                                                defaultValue="Itu"
                                                value={cidade}
                                                onChange={(e) => setCidade(e.target.value)}
                                            />
                                            <Input
                                                placeholder="Estado"
                                                defaultValue="SP"
                                                value={estado}
                                                onChange={(e) => setEstado(e.target.value)}
                                            />
                                            <Input placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="responsavel" className="dark:text-gray-200">
                                            Nome do Responsável *
                                        </Label>
                                        <Input
                                            id="responsavel"
                                            placeholder="Nome completo do responsável pela ONG"
                                            value={responsavel}
                                            onChange={(e) => setResponsavel(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="cargo-responsavel" className="dark:text-gray-200">
                                            Cargo do Responsável *
                                        </Label>
                                        <Input
                                            id="cargo-responsavel"
                                            placeholder="Ex: Presidente, Diretor, Coordenador"
                                            value={cargoResponsavel}
                                            onChange={(e) => setCargoResponsavel(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Aba de Atuação */}
                            <TabsContent value="atuacao" className="space-y-4 pt-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="dark:text-gray-200">Áreas de Atuação *</Label>
                                        <div className="grid gap-2 sm:grid-cols-2">
                                            {areasAtuacaoOptions.map((area) => (
                                                <div key={area.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`area-${area.id}`}
                                                        checked={areasAtuacao.includes(area.id)}
                                                        onCheckedChange={() => toggleAreaAtuacao(area.id)}
                                                    />
                                                    <label
                                                        htmlFor={`area-${area.id}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                                                    >
                                                        {area.nome}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="dark:text-gray-200">Formas de Ajuda Aceitas</Label>
                                        <div className="grid gap-2 sm:grid-cols-2">
                                            {formasAjudaOptions.map((forma) => (
                                                <div key={forma.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`forma-${forma.id}`}
                                                        checked={formasAjuda.includes(forma.id)}
                                                        onCheckedChange={() => toggleFormaAjuda(forma.id)}
                                                    />
                                                    <label
                                                        htmlFor={`forma-${forma.id}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                                                    >
                                                        {forma.nome}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {formasAjuda.includes(1) && (
                                        <div className="space-y-2">
                                            <Label htmlFor="como-ajudar-voluntariado" className="dark:text-gray-200">
                                                Como ajudar - Voluntariado
                                            </Label>
                                            <Textarea
                                                id="como-ajudar-voluntariado"
                                                placeholder="Descreva como as pessoas podem ajudar como voluntárias"
                                                value={descricaoVoluntariado}
                                                onChange={(e) => setDescricaoVoluntariado(e.target.value)}
                                            />
                                        </div>
                                    )}

                                    {formasAjuda.some((id) => [2, 3, 4, 5].includes(id)) && (
                                        <div className="space-y-2">
                                            <Label htmlFor="como-ajudar-doacao" className="dark:text-gray-200">
                                                Como ajudar - Doações
                                            </Label>
                                            <Textarea
                                                id="como-ajudar-doacao"
                                                placeholder="Descreva como as pessoas podem ajudar com doações"
                                                value={descricaoDoacao}
                                                onChange={(e) => setDescricaoDoacao(e.target.value)}
                                            />
                                        </div>
                                    )}

                                    {formasAjuda.includes(6) && (
                                        <div className="space-y-2">
                                            <Label htmlFor="como-ajudar-parceria" className="dark:text-gray-200">
                                                Como ajudar - Parcerias
                                            </Label>
                                            <Textarea
                                                id="como-ajudar-parceria"
                                                placeholder="Descreva como empresas podem estabelecer parcerias"
                                                value={descricaoParceria}
                                                onChange={(e) => setDescricaoParceria(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

                            {/* Aba de Documentos */}
                            <TabsContent value="documentos" className="space-y-4 pt-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="cnpj" className="dark:text-gray-200">
                                            CNPJ
                                        </Label>
                                        <Input
                                            id="cnpj"
                                            placeholder="00.000.000/0000-00"
                                            value={cnpj}
                                            onChange={(e) => setCnpj(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="dark:text-gray-200">Certificações e Títulos</Label>
                                        <div className="grid gap-2 sm:grid-cols-2">
                                            {certificacoesOptions.map((cert) => (
                                                <div key={cert.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`cert-${cert.id}`}
                                                        checked={certificacoes.includes(cert.id)}
                                                        onCheckedChange={() => toggleCertificacao(cert.id)}
                                                    />
                                                    <label
                                                        htmlFor={`cert-${cert.id}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                                                    >
                                                        {cert.nome}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
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
                </CardContent>
            </Card>
        </div>
    )
}
