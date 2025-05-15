import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, Clock, CheckCircle } from "lucide-react"

export default async function DashboardPage() {
  const supabase = getSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error("Erro ao buscar perfil:", profileError)
    redirect("/auth/login")
  }


  const isAdmin = profile.role === "admin"

  let totalOngs = 0
  let ongsAprovadas = 0
  let ongsPendentes = 0
  let totalUsuarios = 0

  if (isAdmin) {
    const { count: countTotal } = await supabase.from("ongs").select("*", { count: "exact", head: true })

    totalOngs = countTotal || 0

    const { count: countAprovadas } = await supabase
      .from("ongs")
      .select("*", { count: "exact", head: true })
      .eq("status", "aprovado")

    ongsAprovadas = countAprovadas || 0

    const { count: countPendentes } = await supabase
      .from("ongs")
      .select("*", { count: "exact", head: true })
      .eq("status", "pendente")

    ongsPendentes = countPendentes || 0

    const { count: countUsuarios } = await supabase.from("profiles").select("*", { count: "exact", head: true })

    totalUsuarios = countUsuarios || 0
  } else {
    const { data: ongData } = await supabase.from("ongs").select("*").eq("user_id", user.id).single()

    if (ongData) {
      redirect("/dashboard/minha-ong")
    } else {
      redirect("/dashboard/cadastrar-ong")
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight dark:text-gray-100">Dashboard</h1>

      {isAdmin ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="dark:border-gray-800 dark:bg-gray-950">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium dark:text-gray-100">Total de ONGs</CardTitle>
              <Building className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-gray-100">{totalOngs}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">ONGs cadastradas na plataforma</p>
            </CardContent>
          </Card>

          <Card className="dark:border-gray-800 dark:bg-gray-950">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium dark:text-gray-100">ONGs Aprovadas</CardTitle>
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-gray-100">{ongsAprovadas}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">ONGs com cadastro aprovado</p>
            </CardContent>
          </Card>

          <Card className="dark:border-gray-800 dark:bg-gray-950">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium dark:text-gray-100">ONGs Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-gray-100">{ongsPendentes}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">ONGs aguardando aprovação</p>
            </CardContent>
          </Card>

          <Card className="dark:border-gray-800 dark:bg-gray-950">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium dark:text-gray-100">Usuários</CardTitle>
              <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-gray-100">{totalUsuarios}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Usuários cadastrados</p>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  )
}
