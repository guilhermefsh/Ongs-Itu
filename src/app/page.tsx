import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Users, HandHelping } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/home_photo.png"
              alt="Voluntários em ação"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-center sm:mx-auto">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-blue-400 dark:text-white sm:text-5xl md:text-6xl">
                Conectando você a quem transforma Itu
              </h1>
              <p className="mb-8 text-xl text-gray-200">
                Descubra ONGs e projetos sociais da sua cidade e saiba como contribuir.
              </p>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/ongs">Conheça as ONGs</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 dark:bg-gray-900">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              Nossa Missão
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
                <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold dark:text-gray-100">Acesso rápido à informação</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Conectamos você diretamente com as ONGs de Itu, facilitando o acesso a informações sobre projetos e
                  iniciativas sociais.
                </p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
                <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <HandHelping className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold dark:text-gray-100">Incentivo ao voluntariado</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Promovemos oportunidades de voluntariado, permitindo que você contribua com seu tempo e habilidades
                  para causas importantes.
                </p>
              </div>
              <div className="flex flex-col items-center rounded-lg bg-gray-50 p-6 text-center shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
                <div className="mb-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                  <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold dark:text-gray-100">Apoio a causas sociais</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Facilitamos doações e parcerias, fortalecendo o impacto das organizações sociais em nossa comunidade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="bg-blue-50 py-16 dark:bg-blue-950/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              Depoimentos
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <p className="mb-4 italic text-gray-600 dark:text-gray-300">
                  "Participar como voluntário mudou minha perspectiva sobre nossa cidade. Recomendo a todos que querem
                  fazer a diferença."
                </p>
                <p className="font-medium dark:text-gray-200">Carlos Silva, Voluntário</p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <p className="mb-4 italic text-gray-600 dark:text-gray-300">
                  "Através deste portal, nossa ONG conseguiu aumentar o número de voluntários e doações. Uma iniciativa
                  que realmente conecta pessoas."
                </p>
                <p className="font-medium dark:text-gray-200">Maria Oliveira, Coordenadora de ONG</p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <p className="mb-4 italic text-gray-600 dark:text-gray-300">
                  "Encontrei facilmente como contribuir com causas que me importo. A plataforma torna o processo de
                  ajudar muito mais acessível."
                </p>
                <p className="font-medium dark:text-gray-200">Ana Santos, Doadora</p>
              </div>
            </div>
          </div>
        </section> */}

        <section className="bg-blue-700 py-16 text-white dark:bg-blue-800">
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Faça parte desta transformação</h2>
            <p className="mb-8 text-xl">Junte-se a nós e ajude a construir uma Itu mais solidária e inclusiva.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white bg-transparent text-white hover:bg-white hover:text-blue-700 dark:hover:text-blue-800"
              >
                <Link href="/como-ajudar">Como Ajudar</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-gray-100 dark:text-blue-800">
                <Link href="/ongs">Conhecer ONGs</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
