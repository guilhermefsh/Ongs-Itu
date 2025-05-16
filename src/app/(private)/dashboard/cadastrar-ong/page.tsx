import { Suspense } from "react"
import { OngForm } from "./form"
import { getInitialData } from "@/app/actions/ongs/create-ong"

export default async function RegisterONGPage() {
  const initialData = await getInitialData()

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mb-6 text-2xl font-bold tracking-tight dark:text-gray-100">Cadastrar ONG</h1>
      <Suspense fallback={<div>Carregando...</div>}>
        <OngForm initialData={{ ...initialData, user: { ...initialData.user, email: initialData.user.email ?? null } }} />
      </Suspense>
    </div>
  )
}
