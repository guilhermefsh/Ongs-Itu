"use client"

import { useState, useEffect, useTransition, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Ong = {
  id: string
  name: string
  cause: string
  description: string
  logo: string
  image: string
}

// ! todo: ajustar filtro

export default function OngsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [causeFilter, setCauseFilter] = useState("all")
  const [ongs, setOngs] = useState<Ong[]>([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const fetchOngs = async () => {
      try {
        startTransition(async () => {
          const response = await fetch(`/api/ongs`)
          if (!response.ok) throw new Error("Failed to fetch Ongs")

          const data = await response.json()
          setOngs(data)
        })
      } catch (error) {
        console.error("Error fetching Ongs:", error)
      }
    }

    fetchOngs()
  }, [searchTerm])

  const filteredNgos = useMemo(() => ongs.filter(ong => {
    const matchesSearch = ong.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ong.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCause = causeFilter === "all" || ong.cause === causeFilter
    return matchesSearch && matchesCause
  }), [ongs, searchTerm, causeFilter])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        Descubra ONGs e iniciativas sociais em Itu
      </h1>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Pesquisar ONG..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={causeFilter} onValueChange={setCauseFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por causa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as causas</SelectItem>
            <SelectItem value="Education">Educação</SelectItem>
            <SelectItem value="Health">Saúde</SelectItem>
            <SelectItem value="Environment">Meio Ambiente</SelectItem>
            <SelectItem value="Children">Crianças</SelectItem>
            <SelectItem value="Women">Mulheres</SelectItem>
            <SelectItem value="Animals">Animais</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isPending ? (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">Carregando ONGs...</p>
        ) : filteredNgos.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            Nenhuma ONG encontrada com os filtros selecionados.
          </p>
        ) : (
          filteredNgos.map((ngo) => (
            <Card key={ngo.id} className="overflow-hidden dark:border-gray-800 dark:bg-gray-950">
              <div className="relative h-48 w-full">
                <Image
                  src={ngo.image}
                  alt={ngo.name}
                  fill
                  className="object-cover"
                  unoptimized={ngo.image.startsWith("http")}
                />
              </div>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-sm dark:border-gray-800">
                  <Image
                    src={ngo.logo}
                    alt={`Logo da ${ngo.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="dark:text-gray-100">{ngo.name}</CardTitle>
                  <CardDescription>
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                    >
                      {ngo.cause}
                    </Badge>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{ngo.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/ongs/${ngo.id}`}>Saiba mais</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
} 