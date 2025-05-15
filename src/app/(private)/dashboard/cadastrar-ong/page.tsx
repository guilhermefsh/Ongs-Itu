"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/client"
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

export default function CadastrarONGPage() {
  const router = useRouter()
  const supabase = getSupabaseClient()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  const [nome, setNome] = useState("")
  const [nomeFantasia, setNomeFantasia] = useState("")
  const [descricaoCurta, setDescricaoCurta] = useState("")
  const [descricaoCompleta, setDescricaoCompleta] = useState("")
  const [anoFundacao, setAnoFundacao] = useState("")
  const [causa, setCausa] = useState("")

  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [site, setSite] = useState("")
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const [endereco, setEndereco] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("Itu")
  const [estado, setEstado] = useState("SP")
  const [cep, setCep] = useState("")
  const [responsavel, setResponsavel] = useState("")
  const [cargoResponsavel, setCargoResponsavel] = useState("")

  const [areasAtuacao, setAreasAtuacao] = useState<number[]>([])
  const [areasAtuacaoOptions, setAreasAtuacaoOptions] = useState<{ id: number; nome: string }[]>([])

  const [formasAjuda, setFormasAjuda] = useState<number[]>([])
  const [formasAjudaOptions, setFormasAjudaOptions] = useState<{ id: number; nome: string }[]>([])
  const [descricaoVoluntariado, setDescricaoVoluntariado] = useState("")
  const [descricaoDoacao, setDescricaoDoacao] = useState("")
  const [descricaoParceria, setDescricaoParceria] = useState("")

  const [cnpj, setCnpj] = useState("")
  const [certificacoes, setCertificacoes] = useState<number[]>([])
  const [certificacoesOptions, setCertificacoesOptions] = useState<{ id: number; nome: string }[]>([])
  const [termos, setTermos] = useState(false)
  const [privacidade, setPrivacidade] = useState(false)

  useEffect(() => {
    const fetchUserAndOptions = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        setEmail(user.email || "")
      } else {
        router.push("/auth/login")
      }

      const { data: areasData } = await supabase.from("areas_atuacao").select("id, nome").order("nome")

      if (areasData) {
        setAreasAtuacaoOptions(areasData)
      }

      const { data: formasData } = await supabase.from("formas_ajuda").select("id, nome").order("nome")

      if (formasData) {
        setFormasAjudaOptions(formasData)
      }

      const { data: certData } = await supabase.from("certificacoes").select("id, nome").order("nome")

      if (certData) {
        setCertificacoesOptions(certData)
      }
    }

    fetchUserAndOptions()
  }, [router, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!termos || !privacidade) {
      setError("Você precisa aceitar os termos e a política de privacidade")
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (!userId) {
        throw new Error("Usuário não autenticado")
      }

      const { data: ongData, error: ongError } = await supabase
        .from("ongs")
        .insert({
          user_id: userId,
          nome,
          nome_fantasia: nomeFantasia || null,
          descricao_curta: descricaoCurta,
          descricao_completa: descricaoCompleta,
          ano_fundacao: Number.parseInt(anoFundacao),
          causa,
          endereco: endereco ? `${endereco}, ${numero}${complemento ? ` - ${complemento}` : ""}, ${bairro}` : null,
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
          status: "pendente",
        })
        .select("id")
        .single()

      if (ongError) {
        throw ongError
      }

      const ongId = ongData.id

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

      // Inserir formas de ajuda
      if (formasAjuda.length > 0) {
        const formasInsert = formasAjuda.map((formaId) => {
          let descricao = null

          if (formaId === 1) {
            descricao = descricaoVoluntariado
          } else if (formaId === 2) {
            descricao = descricaoDoacao
          } else if (formaId === 6) {
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

      setTimeout(() => {
        router.push("/dashboard/minha-ong")
      }, 3000)
    } catch (error: any) {
      setError(error.message || "Erro ao cadastrar ONG. Tente novamente.")
    } finally {
      setLoading(false)
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

  if (success) {
    return (
      <div className="max-w-3xl mx-auto">
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
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mb-6 text-2xl font-bold tracking-tight dark:text-gray-100">Cadastrar ONG</h1>

      <Card className="dark:border-gray-800 dark:bg-gray-950">
        <CardHeader>
          <CardTitle className="dark:text-gray-100">Informações da ONG</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Preencha os dados da sua organização para cadastro na plataforma.
          </CardDescription>
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
                      placeholder="Rua/Avenida"
                      className="mb-2"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                    />
                    <div className="grid gap-2 sm:grid-cols-3">
                      <Input placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} />
                      <Input
                        placeholder="Complemento"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                      />
                      <Input placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                    </div>
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

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="termos"
                        checked={termos}
                        onCheckedChange={(checked) => setTermos(checked as boolean)}
                        required
                      />
                      <label
                        htmlFor="termos"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                      >
                        Declaro que todas as informações fornecidas são verdadeiras e que estou autorizado a representar
                        esta organização *
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="privacidade"
                        checked={privacidade}
                        onCheckedChange={(checked) => setPrivacidade(checked as boolean)}
                        required
                      />
                      <label
                        htmlFor="privacidade"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                      >
                        Concordo com a política de privacidade e autorizo o uso dos dados fornecidos para fins de
                        divulgação da ONG *
                      </label>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" type="button" className="dark:border-gray-700 dark:text-gray-300">
                Salvar como rascunho
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar cadastro"}
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
    </div>
  )
}
