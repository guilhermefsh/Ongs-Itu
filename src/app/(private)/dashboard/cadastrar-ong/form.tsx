"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ongSchema, type OngFormData } from "./schema"
import { createOng } from "@/app/actions/ongs/create-ong"

interface OngFormProps {
    initialData: {
        user: { id: string; email: string | null }
        areasAtuacao: { id: number; nome: string }[]
        formasAjuda: { id: number; nome: string }[]
        certificacoes: { id: number; nome: string }[]
    }
}

export function OngForm({ initialData }: OngFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<OngFormData>({
        resolver: zodResolver(ongSchema),
        defaultValues: {
            email: initialData.user.email || "",
            city: "Itu",
            state: "SP",
            areasOfAction: [],
            helpTypes: [],
            certifications: [],
        },
    })

    const helpTypes = watch("helpTypes")

    const onSubmit = async (data: OngFormData) => {
        setError(null)

        startTransition(async () => {
            try {
                await createOng(data)
                setSuccess(true)
                setTimeout(() => {
                    router.push("/dashboard/minha-ong")
                }, 3000)
            } catch (error: any) {
                setError("Erro ao cadastrar ONG. Tente novamente.")
            }
        })
    }

    if (success) {
        return (
            <Card className="dark:border-gray-800 dark:bg-gray-950">
                <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                        <div className="rounded-full bg-emerald-100 p-3 dark:bg-emerald-900">
                            <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </div>
                    <CardTitle className="text-center text-2xl dark:text-gray-100">Cadastro enviado com sucesso!</CardTitle>
                    <CardDescription className="text-center dark:text-gray-400">
                        Seu cadastro foi recebido e está em análise pela nossa equipe.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Você receberá um e-mail quando seu cadastro for aprovado. Enquanto isso, você já pode acessar seu painel e
                        complementar as informações da sua ONG.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">Redirecionando para o painel...</p>
                </CardContent>
            </Card>
        )
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
                <form onSubmit={handleSubmit(onSubmit)}>
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
                            <div className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="dark:text-gray-200">
                                            Nome da ONG *
                                        </Label>
                                        <Input
                                            id="name"
                                            placeholder="Nome oficial da organização"
                                            {...register("name")}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500">{errors.name.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tradeName" className="dark:text-gray-200">
                                            Nome Fantasia
                                        </Label>
                                        <Input
                                            id="tradeName"
                                            placeholder="Nome pelo qual a ONG é conhecida (se diferente)"
                                            {...register("tradeName")}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="shortDescription" className="dark:text-gray-200">
                                        Descrição Curta *
                                    </Label>
                                    <Textarea
                                        id="shortDescription"
                                        placeholder="Breve descrição da ONG (até 150 caracteres)"
                                        maxLength={150}
                                        {...register("shortDescription")}
                                    />
                                    {errors.shortDescription && (
                                        <p className="text-sm text-red-500">{errors.shortDescription.message}</p>
                                    )}
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Esta descrição será exibida nos cards e resultados de busca.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fullDescription" className="dark:text-gray-200">
                                        Descrição Completa *
                                    </Label>
                                    <Textarea
                                        id="fullDescription"
                                        placeholder="Descreva detalhadamente o trabalho da sua ONG, sua história, missão e valores"
                                        className="min-h-[150px]"
                                        {...register("fullDescription")}
                                    />
                                    {errors.fullDescription && (
                                        <p className="text-sm text-red-500">{errors.fullDescription.message}</p>
                                    )}
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="foundingYear" className="dark:text-gray-200">
                                            Ano de Fundação *
                                        </Label>
                                        <Input
                                            id="foundingYear"
                                            type="number"
                                            placeholder="Ex: 2010"
                                            min="1900"
                                            max={new Date().getFullYear()}
                                            {...register("foundingYear")}
                                        />
                                        {errors.foundingYear && (
                                            <p className="text-sm text-red-500">{errors.foundingYear.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="mainCause" className="dark:text-gray-200">
                                            Causa Principal *
                                        </Label>
                                        <Select onValueChange={(value) => setValue("mainCause", value)}>
                                            <SelectTrigger id="mainCause">
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
                                        {errors.mainCause && (
                                            <p className="text-sm text-red-500">{errors.mainCause.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

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
                                            {...register("email")}
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-500">{errors.email.message}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="dark:text-gray-200">
                                            Telefone
                                        </Label>
                                        <Input
                                            id="phone"
                                            placeholder="(11) 99999-9999"
                                            {...register("phone")}
                                            onChange={(e) => {
                                                e.target.value = e.target.value
                                                    .replace(/\D/g, "")
                                                    .replace(/^(\d{2})(\d)/g, "($1) $2")
                                                    .replace(/(\d)(\d{4})$/, "$1-$2");
                                            }}
                                            maxLength={15}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="website" className="dark:text-gray-200">
                                        Site
                                    </Label>
                                    <Input
                                        id="website"
                                        type="url"
                                        placeholder="https://www.suaong.org.br"
                                        {...register("website")}
                                    />
                                    {errors.website && (
                                        <p className="text-sm text-red-500">{errors.website.message}</p>
                                    )}
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="facebook" className="dark:text-gray-200">
                                            Facebook
                                        </Label>
                                        <Input
                                            id="facebook"
                                            placeholder="facebook.com/suaong"
                                            {...register("facebook")}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="instagram" className="dark:text-gray-200">
                                            Instagram
                                        </Label>
                                        <Input
                                            id="instagram"
                                            placeholder="instagram.com/suaong"
                                            {...register("instagram")}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="dark:text-gray-200">Endereço</Label>
                                    <Input
                                        placeholder="Rua/Avenida"
                                        className="mb-2"
                                        {...register("address")}
                                    />
                                    <div className="grid gap-2 sm:grid-cols-3">
                                        <Input placeholder="Número" {...register("number")} />
                                        <Input placeholder="Complemento" {...register("complement")} />
                                        <Input placeholder="Bairro" {...register("neighborhood")} />
                                    </div>
                                    <div className="grid gap-2 sm:grid-cols-3">
                                        <Input placeholder="Cidade" {...register("city")} />
                                        <Input placeholder="Estado" {...register("state")} />
                                        <Input placeholder="CEP" {...register("zipCode")} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="responsibleName" className="dark:text-gray-200">
                                        Nome do Responsável *
                                    </Label>
                                    <Input
                                        id="responsibleName"
                                        placeholder="Nome completo do responsável pela ONG"
                                        {...register("responsibleName")}
                                    />
                                    {errors.responsibleName && (
                                        <p className="text-sm text-red-500">{errors.responsibleName.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="responsibleRole" className="dark:text-gray-200">
                                        Cargo do Responsável *
                                    </Label>
                                    <Input
                                        id="responsibleRole"
                                        placeholder="Ex: Presidente, Diretor, Coordenador"
                                        {...register("responsibleRole")}
                                    />
                                    {errors.responsibleRole && (
                                        <p className="text-sm text-red-500">{errors.responsibleRole.message}</p>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="atuacao" className="space-y-4 pt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="dark:text-gray-200">Áreas de Atuação *</Label>
                                    <div className="grid gap-2 sm:grid-cols-2">
                                        {initialData.areasAtuacao.map((area) => (
                                            <div key={area.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`area-${area.id}`}
                                                    checked={watch("areasOfAction").includes(area.id)}
                                                    onCheckedChange={(checked) => {
                                                        const currentAreas = watch("areasOfAction")
                                                        if (checked) {
                                                            setValue("areasOfAction", [...currentAreas, area.id])
                                                        } else {
                                                            setValue(
                                                                "areasOfAction",
                                                                currentAreas.filter((id) => id !== area.id)
                                                            )
                                                        }
                                                    }}
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
                                    {errors.areasOfAction && (
                                        <p className="text-sm text-red-500">{errors.areasOfAction.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label className="dark:text-gray-200">Formas de Ajuda Aceitas</Label>
                                    <div className="grid gap-2 sm:grid-cols-2">
                                        {initialData.formasAjuda.map((forma) => (
                                            <div key={forma.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`forma-${forma.id}`}
                                                    checked={helpTypes.includes(forma.id)}
                                                    onCheckedChange={(checked) => {
                                                        const currentFormas = watch("helpTypes")
                                                        if (checked) {
                                                            setValue("helpTypes", [...currentFormas, forma.id])
                                                        } else {
                                                            setValue(
                                                                "helpTypes",
                                                                currentFormas.filter((id) => id !== forma.id)
                                                            )
                                                        }
                                                    }}
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

                                {helpTypes.includes(1) && (
                                    <div className="space-y-2">
                                        <Label htmlFor="volunteerDescription" className="dark:text-gray-200">
                                            Como ajudar - Voluntariado
                                        </Label>
                                        <Textarea
                                            id="volunteerDescription"
                                            placeholder="Descreva como as pessoas podem ajudar como voluntárias"
                                            {...register("volunteerDescription")}
                                        />
                                    </div>
                                )}

                                {helpTypes.some((id) => [2, 3, 4, 5].includes(id)) && (
                                    <div className="space-y-2">
                                        <Label htmlFor="donationDescription" className="dark:text-gray-200">
                                            Como ajudar - Doações
                                        </Label>
                                        <Textarea
                                            id="donationDescription"
                                            placeholder="Descreva como as pessoas podem ajudar com doações"
                                            {...register("donationDescription")}
                                        />
                                    </div>
                                )}

                                {helpTypes.includes(6) && (
                                    <div className="space-y-2">
                                        <Label htmlFor="partnershipDescription" className="dark:text-gray-200">
                                            Como ajudar - Parcerias
                                        </Label>
                                        <Textarea
                                            id="partnershipDescription"
                                            placeholder="Descreva como empresas podem estabelecer parcerias"
                                            {...register("partnershipDescription")}
                                        />
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="documentos" className="space-y-4 pt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cnpj" className="dark:text-gray-200">
                                        CNPJ
                                    </Label>
                                    <Input
                                        id="cnpj"
                                        placeholder="00.000.000/0000-00"
                                        {...register("cnpj")}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="dark:text-gray-200">Certificações e Títulos</Label>
                                    <div className="grid gap-2 sm:grid-cols-2">
                                        {initialData.certificacoes.map((cert) => (
                                            <div key={cert.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`cert-${cert.id}`}
                                                    checked={watch("certifications").includes(cert.id)}
                                                    onCheckedChange={(checked) => {
                                                        const currentCerts = watch("certifications")
                                                        if (checked) {
                                                            setValue("certifications", [...currentCerts, cert.id])
                                                        } else {
                                                            setValue(
                                                                "certifications",
                                                                currentCerts.filter((id) => id !== cert.id)
                                                            )
                                                        }
                                                    }}
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

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="termsAccepted"
                                            checked={watch("termsAccepted")}
                                            onCheckedChange={(checked) => setValue("termsAccepted", checked as boolean)}
                                        />
                                        <label
                                            htmlFor="termsAccepted"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                                        >
                                            Declaro que todas as informações fornecidas são verdadeiras e que estou autorizado a representar
                                            esta organização *
                                        </label>
                                    </div>
                                    {errors.termsAccepted && (
                                        <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="privacyAccepted"
                                            checked={watch("privacyAccepted")}
                                            onCheckedChange={(checked) => setValue("privacyAccepted", checked as boolean)}
                                        />
                                        <label
                                            htmlFor="privacyAccepted"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                                        >
                                            Concordo com a política de privacidade e autorizo o uso dos dados fornecidos para fins de
                                            divulgação da ONG *
                                        </label>
                                    </div>
                                    {errors.privacyAccepted && (
                                        <p className="text-sm text-red-500">{errors.privacyAccepted.message}</p>
                                    )}
                                </div>
                            </div>
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