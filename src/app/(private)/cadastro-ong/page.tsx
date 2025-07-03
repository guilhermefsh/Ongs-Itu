import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Actuation, BasicInfo, Contact, Documents } from "./subcomponents"

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

            <TabsContent value="informacoes" className="space-y-4 pt-4">
              <BasicInfo />
            </TabsContent>

            <TabsContent value="contato" className="space-y-4 pt-4">
              <Contact />
            </TabsContent>

            <TabsContent value="atuacao" className="space-y-4 pt-4">
              <Actuation />
            </TabsContent>

            <TabsContent value="documentos" className="space-y-4 pt-4">
              <Documents />
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
