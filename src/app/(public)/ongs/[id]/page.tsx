import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Heart, Users } from "lucide-react"
import { useOngDetails, type ONG } from "@/hooks/use-ong-details"

export default async function ONGDetailPage({ params }: { params: { id: string } }) {
  const ong = await useOngDetails(params.id)

  if (!ong) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">ONG não encontrada</h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          A ONG que você está procurando não foi encontrada ou não está disponível.
        </p>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="dark:border-gray-700 dark:text-gray-300">
            <Link href="/ongs">Voltar para lista de ONGs</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-8 md:grid-cols-2">

        <div className="relative h-64 overflow-hidden rounded-lg md:h-full">
          <Image src={ong.image || "/placeholder.svg"} alt={ong.name} fill className="object-cover" />
        </div>

        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            {ong.name}
          </h1>
          <div className="mb-4">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {ong.cause}
            </span>
          </div>
          <p className="mb-6 text-gray-700 dark:text-gray-300">{ong.description}</p>

          <div className="space-y-3">
            {ong.address && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                <span>{ong.address}</span>
              </div>
            )}
            {ong.phone && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                <span>{ong.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-500" />
              <a href={`mailto:${ong.email}`} className="hover:text-blue-700 dark:hover:text-blue-500">
                {ong.email}
              </a>
            </div>
            {ong.website && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                <a
                  href={`https://${ong.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700 dark:hover:text-blue-500"
                >
                  {ong.website}
                </a>
              </div>
            )}
          </div>


          <div className="mt-6 flex gap-4">
            {ong.facebook && (
              <a
                href={`https://${ong.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
            )}
            {ong.instagram && (
              <a
                href={`https://${ong.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
              >
                <Instagram className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                <span>Instagram</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Como Ajudar</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="dark:border-gray-800 dark:bg-gray-950">
            <CardHeader className="flex flex-row items-center gap-2">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              <CardTitle className="dark:text-gray-100">Voluntariado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">{ong.howToHelp.volunteering}</p>
              <Button asChild className="mt-4 w-full">
                <Link href="/como-ajudar#voluntariado">Quero ser voluntário</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="dark:border-gray-800 dark:bg-gray-950">
            <CardHeader className="flex flex-row items-center gap-2">
              <Heart className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              <CardTitle className="dark:text-gray-100">Doações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">{ong.howToHelp.donation}</p>
              <Button asChild className="mt-4 w-full">
                <Link href="/como-ajudar#doacao">Quero doar</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="dark:border-gray-800 dark:bg-gray-950">
            <CardHeader className="flex flex-row items-center gap-2">
              <Globe className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              <CardTitle className="dark:text-gray-100">Parcerias</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">{ong.howToHelp.partnership}</p>
              <Button asChild className="mt-4 w-full">
                <Link href="/como-ajudar#parceria">Quero ser parceiro</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="mt-12 text-center">
        <Button asChild variant="outline" className="dark:border-gray-700 dark:text-gray-300">
          <Link href="/ongs">Voltar para lista de ONGs</Link>
        </Button>
      </div>
    </div>
  )
}
