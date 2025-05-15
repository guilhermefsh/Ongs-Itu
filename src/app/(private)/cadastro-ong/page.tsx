import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function RegisterONGPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Cadastro de ONG
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Preencha o formulário abaixo para cadastrar sua ONG em nossa plataforma e divulgar seu trabalho para a
          comunidade de Itu.
        </p>
      </div>

      <Card className="dark:border-gray-800 dark:bg-gray-950">
        <CardHeader>
          <CardTitle>Informações da ONG</CardTitle>
          <CardDescription>
            Forneça os dados básicos da sua organização. Todos os campos marcados com * são obrigatórios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="informacoes" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="informacoes">Informações</TabsTrigger>
              <TabsTrigger value="contato">Contato</TabsTrigger>
              <TabsTrigger value="atuacao">Atuação</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
            </TabsList>

            {/* Aba de Informações Básicas */}
            <TabsContent value="informacoes" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome da ONG *</Label>
                    <Input id="nome" placeholder="Nome oficial da organização" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nome-fantasia">Nome Fantasia</Label>
                    <Input id="nome-fantasia" placeholder="Nome pelo qual a ONG é conhecida (se diferente)" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao-curta">Descrição Curta *</Label>
                  <Textarea
                    id="descricao-curta"
                    placeholder="Breve descrição da ONG (até 150 caracteres)"
                    maxLength={150}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Esta descrição será exibida nos cards e resultados de busca.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao-completa">Descrição Completa *</Label>
                  <Textarea
                    id="descricao-completa"
                    placeholder="Descreva detalhadamente o trabalho da sua ONG, sua história, missão e valores"
                    className="min-h-[150px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ano-fundacao">Ano de Fundação *</Label>
                  <Input
                    id="ano-fundacao"
                    type="number"
                    placeholder="Ex: 2010"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logo">Logo da ONG</Label>
                  <Input id="logo" type="file" accept="image/*" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Formatos aceitos: JPG, PNG. Tamanho máximo: 2MB.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imagem-capa">Imagem de Capa</Label>
                  <Input id="imagem-capa" type="file" accept="image/*" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Esta imagem será exibida no topo da página da sua ONG. Formatos aceitos: JPG, PNG. Tamanho máximo:
                    5MB.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Aba de Contato */}
            <TabsContent value="contato" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input id="email" type="email" placeholder="contato@suaong.org.br" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input id="telefone" placeholder="(11) 99999-9999" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site">Site</Label>
                  <Input id="site" type="url" placeholder="https://www.suaong.org.br" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input id="facebook" placeholder="facebook.com/suaong" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" placeholder="instagram.com/suaong" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Endereço</Label>
                  <Input placeholder="Rua/Avenida" className="mb-2" />
                  <div className="grid gap-2 sm:grid-cols-3">
                    <Input placeholder="Número" />
                    <Input placeholder="Complemento" />
                    <Input placeholder="Bairro" />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <Input placeholder="Cidade" defaultValue="Itu" />
                    <Input placeholder="Estado" defaultValue="SP" />
                    <Input placeholder="CEP" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsavel">Nome do Responsável *</Label>
                  <Input id="responsavel" placeholder="Nome completo do responsável pela ONG" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargo-responsavel">Cargo do Responsável *</Label>
                  <Input id="cargo-responsavel" placeholder="Ex: Presidente, Diretor, Coordenador" />
                </div>
              </div>
            </TabsContent>

            {/* Aba de Atuação */}
            <TabsContent value="atuacao" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Áreas de Atuação *</Label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="educacao" />
                      <label
                        htmlFor="educacao"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Educação
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="saude" />
                      <label
                        htmlFor="saude"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Saúde
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="meio-ambiente" />
                      <label
                        htmlFor="meio-ambiente"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Meio Ambiente
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="criancas" />
                      <label
                        htmlFor="criancas"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Crianças e Adolescentes
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="idosos" />
                      <label
                        htmlFor="idosos"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Idosos
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mulheres" />
                      <label
                        htmlFor="mulheres"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Mulheres
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="animais" />
                      <label
                        htmlFor="animais"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Animais
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cultura" />
                      <label
                        htmlFor="cultura"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Cultura e Arte
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publico-alvo">Público-alvo *</Label>
                  <Textarea id="publico-alvo" placeholder="Descreva o público que sua ONG atende" />
                </div>

                <div className="space-y-2">
                  <Label>Formas de Ajuda Aceitas</Label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="voluntariado" />
                      <label
                        htmlFor="voluntariado"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Voluntariado
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doacao-financeira" />
                      <label
                        htmlFor="doacao-financeira"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Doação Financeira
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doacao-alimentos" />
                      <label
                        htmlFor="doacao-alimentos"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Doação de Alimentos
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doacao-roupas" />
                      <label
                        htmlFor="doacao-roupas"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Doação de Roupas
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doacao-materiais" />
                      <label
                        htmlFor="doacao-materiais"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Doação de Materiais
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="parcerias" />
                      <label
                        htmlFor="parcerias"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Parcerias Empresariais
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="como-ajudar-voluntariado">Como ajudar - Voluntariado</Label>
                  <Textarea
                    id="como-ajudar-voluntariado"
                    placeholder="Descreva como as pessoas podem ajudar como voluntárias"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="como-ajudar-doacao">Como ajudar - Doações</Label>
                  <Textarea id="como-ajudar-doacao" placeholder="Descreva como as pessoas podem ajudar com doações" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="como-ajudar-parceria">Como ajudar - Parcerias</Label>
                  <Textarea
                    id="como-ajudar-parceria"
                    placeholder="Descreva como empresas podem estabelecer parcerias"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Aba de Documentos */}
            <TabsContent value="documentos" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input id="cnpj" placeholder="00.000.000/0000-00" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estatuto">Estatuto Social</Label>
                  <Input id="estatuto" type="file" accept=".pdf" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Formato aceito: PDF. Tamanho máximo: 10MB.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ata">Ata de Eleição da Diretoria Atual</Label>
                  <Input id="ata" type="file" accept=".pdf" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Formato aceito: PDF. Tamanho máximo: 10MB.</p>
                </div>

                <div className="space-y-2">
                  <Label>Certificações e Títulos</Label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="utilidade-publica-municipal" />
                      <label
                        htmlFor="utilidade-publica-municipal"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Utilidade Pública Municipal
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="utilidade-publica-estadual" />
                      <label
                        htmlFor="utilidade-publica-estadual"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Utilidade Pública Estadual
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="utilidade-publica-federal" />
                      <label
                        htmlFor="utilidade-publica-federal"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Utilidade Pública Federal
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cebas" />
                      <label
                        htmlFor="cebas"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        CEBAS
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="oscip" />
                      <label
                        htmlFor="oscip"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        OSCIP
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="os" />
                      <label
                        htmlFor="os"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Organização Social (OS)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="termos" required />
                    <label
                      htmlFor="termos"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Declaro que todas as informações fornecidas são verdadeiras e que estou autorizado a representar
                      esta organização *
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="privacidade" required />
                    <label
                      htmlFor="privacidade"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Concordo com a política de privacidade e autorizo o uso dos dados fornecidos para fins de
                      divulgação da ONG *
                    </label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="dark:border-gray-700 dark:text-gray-300">
            Salvar como rascunho
          </Button>
          <Button>Enviar cadastro</Button>
        </CardFooter>
      </Card>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Após o envio, seu cadastro será analisado pela nossa equipe e você receberá um e-mail com a confirmação da
          aprovação. Em caso de dúvidas, entre em contato pelo e-mail{" "}
          <a href="mailto:contato@ongsitu.com.br" className="text-emerald-600 hover:underline dark:text-emerald-500">
            contato@ongsitu.com.br
          </a>
          .
        </p>
      </div>
    </div>
  )
}
