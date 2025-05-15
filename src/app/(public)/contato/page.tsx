import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        Entre em Contato
      </h1>
      <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-300">
        Estamos à disposição para esclarecer dúvidas, receber sugestões ou ajudar você a se conectar com as ONGs de Itu.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card className="dark:border-gray-800 dark:bg-gray-950">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Envie uma mensagem</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Preencha o formulário abaixo e entraremos em contato o mais breve possível.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="nome"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                    >
                      Nome
                    </label>
                    <Input id="nome" placeholder="Seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                    >
                      E-mail
                    </label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="assunto"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                  >
                    Assunto
                  </label>
                  <Select>
                    <SelectTrigger id="assunto">
                      <SelectValue placeholder="Selecione o assunto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="duvida">Dúvida</SelectItem>
                      <SelectItem value="voluntariado">Quero ser voluntário</SelectItem>
                      <SelectItem value="doacao">Quero fazer uma doação</SelectItem>
                      <SelectItem value="parceria">Proposta de parceria</SelectItem>
                      <SelectItem value="outro">Outro assunto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="mensagem"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                  >
                    Mensagem
                  </label>
                  <Textarea id="mensagem" placeholder="Digite sua mensagem..." className="min-h-[120px]" />
                </div>

                <Button type="submit" className="w-full">
                  Enviar mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="dark:border-gray-800 dark:bg-gray-950">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Informações de contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-500" />
                <div>
                  <p className="font-medium dark:text-gray-200">Endereço</p>
                  <p className="text-gray-600 dark:text-gray-400">Rua Exemplo, 123 - Centro, Itu - SP, 13300-000</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-500" />
                <div>
                  <p className="font-medium dark:text-gray-200">Telefone</p>
                  <p className="text-gray-600 dark:text-gray-400">(11) 4567-8901</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-500" />
                <div>
                  <p className="font-medium dark:text-gray-200">E-mail</p>
                  <p className="text-gray-600 dark:text-gray-400">contato@ongsitu.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-500" />
                <div>
                  <p className="font-medium dark:text-gray-200">Horário de atendimento</p>
                  <p className="text-gray-600 dark:text-gray-400">Segunda a sexta, das 9h às 17h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:border-gray-800 dark:bg-gray-950">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Perguntas frequentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium dark:text-gray-200">Como posso cadastrar minha ONG no site?</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Entre em contato conosco através do formulário ou e-mail informando os dados da sua organização.
                </p>
              </div>

              <div>
                <p className="font-medium dark:text-gray-200">O cadastro no site tem algum custo?</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Não, o cadastro é totalmente gratuito para todas as ONGs e iniciativas sociais de Itu.
                </p>
              </div>

              <div>
                <p className="font-medium dark:text-gray-200">Como posso me tornar voluntário?</p>
                <p className="text-gray-600 dark:text-gray-400">
                  Você pode entrar em contato diretamente com a ONG de seu interesse ou preencher o formulário de
                  contato selecionando a opção "Quero ser voluntário".
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
