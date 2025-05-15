import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Users, Briefcase, Share2 } from "lucide-react"

export default function HowToHelpPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        Como Ajudar
      </h1>
      <p className="mb-12 text-center text-lg text-gray-600 dark:text-gray-300">
        Existem diversas formas de contribuir com as ONGs e iniciativas sociais de Itu. Conheça as possibilidades e
        escolha a que melhor se adapta ao seu perfil.
      </p>

      <div className="space-y-16">
        <section id="voluntariado" className="scroll-mt-20">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative h-64 overflow-hidden rounded-lg md:h-auto">
              <Image src="/how-to-help/voluntary.png" alt="Voluntários em ação" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Quero ser voluntário</h2>
              </div>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                O voluntariado é uma forma poderosa de transformar vidas, incluindo a sua. Ao dedicar seu tempo e
                habilidades, você contribui diretamente para o fortalecimento das iniciativas sociais em nossa cidade e
                cria um impacto positivo na comunidade.
              </p>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Cada ONG possui necessidades específicas de voluntariado, que podem incluir:
              </p>
              <ul className="mb-6 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                <li>Apoio em eventos e campanhas</li>
                <li>Atividades administrativas</li>
                <li>Atendimento ao público</li>
                <li>Oficinas e aulas</li>
                <li>Serviços especializados (jurídico, contábil, design, etc.)</li>
              </ul>
              <Button asChild size="lg" className="w-fit">
                <Link href="/contato">Quero me cadastrar como voluntário</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="doacao" className="scroll-mt-20">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center md:order-first">
              <div className="mb-4 flex items-center gap-2">
                <Heart className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Quero doar</h2>
              </div>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                As doações são fundamentais para a manutenção e ampliação dos trabalhos realizados pelas ONGs. Você pode
                contribuir de diversas formas, de acordo com suas possibilidades.
              </p>
              <p className="mb-6 text-gray-600 dark:text-gray-300">Tipos de doações aceitas pelas ONGs:</p>
              <ul className="mb-6 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                <li>Doações financeiras (pontuais ou recorrentes)</li>
                <li>Alimentos não perecíveis</li>
                <li>Roupas, calçados e cobertores</li>
                <li>Material escolar</li>
                <li>Móveis e eletrodomésticos</li>
                <li>Medicamentos</li>
              </ul>
              <Button asChild size="lg" className="w-fit">
                <Link href="/ongs">Ver ONGs que aceitam doações</Link>
              </Button>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg md:h-auto md:order-last">
              <Image src="/how-to-help/donation.png" alt="Doações para ONGs" fill className="object-cover" />
            </div>
          </div>
        </section>

        <section id="parceria" className="scroll-mt-20">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative h-64 overflow-hidden rounded-lg md:h-auto">
              <Image src="/how-to-help/partnership.png" alt="Parceria empresarial" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-4 flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Quero ser parceiro</h2>
              </div>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Empresas e instituições podem estabelecer parcerias com as ONGs, contribuindo de forma significativa
                para o desenvolvimento de projetos sociais em Itu.
              </p>
              <p className="mb-6 text-gray-600 dark:text-gray-300">Formas de parceria:</p>
              <ul className="mb-6 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                <li>Patrocínio de projetos e eventos</li>
                <li>Doações regulares de produtos ou serviços</li>
                <li>Voluntariado corporativo</li>
                <li>Cessão de espaço físico</li>
                <li>Apoio técnico especializado</li>
              </ul>
              <Button asChild size="lg" className="w-fit">
                <Link href="/contato">Quero estabelecer uma parceria</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="divulgacao" className="scroll-mt-20">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center md:order-first">
              <div className="mb-4 flex items-center gap-2">
                <Share2 className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Quero divulgar</h2>
              </div>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                A divulgação é uma forma simples e eficaz de apoiar as ONGs. Compartilhar informações sobre os projetos
                sociais ajuda a ampliar o alcance das iniciativas e atrair mais apoiadores.
              </p>
              <p className="mb-6 text-gray-600 dark:text-gray-300">Como você pode ajudar na divulgação:</p>
              <ul className="mb-6 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                <li>Compartilhar as publicações das ONGs nas redes sociais</li>
                <li>Falar sobre os projetos para amigos e familiares</li>
                <li>Participar de eventos e convidar pessoas</li>
                <li>Utilizar materiais de divulgação em seu negócio ou local de trabalho</li>
              </ul>
              <Button asChild size="lg" className="w-fit">
                <Link href="/ongs">Conhecer ONGs para divulgar</Link>
              </Button>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg md:h-auto md:order-last">
              <Image src="/how-to-help/disclosure.png" alt="Divulgação de projetos sociais" fill className="object-cover" />
            </div>
          </div>
        </section>
      </div>

      <div className="mt-16 rounded-lg bg-blue-50 p-8 text-center dark:bg-blue-950/30">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Toda ajuda faz diferença</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Independentemente da forma como você escolher contribuir, saiba que seu apoio é fundamental para fortalecer as
          iniciativas sociais em nossa cidade.
        </p>
        <Button asChild size="lg">
          <Link href="/ongs">Conheça as ONGs de Itu</Link>
        </Button>
      </div>
    </div>
  )
}
