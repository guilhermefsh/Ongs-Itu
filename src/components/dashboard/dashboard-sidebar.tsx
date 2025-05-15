"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { getSupabaseClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/database.types"
import { Home, Users, Building, Settings, PlusCircle, Edit } from "lucide-react"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = getSupabaseClient()

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setIsLoading(true)
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          console.log("Current user:", user)
          const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", user.id).single()

          if (error) {
            console.error("Error fetching profile:", error)
          }

          if (profile) {
            console.log("User role:", profile.role)
            setUserRole(profile.role)
          }
        }
      } catch (error) {
        console.error("Error in fetchUserRole:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserRole()
  }, [supabase])

  // Mostrar um estado de carregamento enquanto buscamos o perfil
  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center border-r bg-white dark:bg-gray-950 dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">Carregando...</p>
      </div>
    )
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      roles: ["admin", "ong"],
    },
    {
      title: "ONGs",
      href: "/dashboard/ongs",
      icon: Building,
      roles: ["admin"],
    },
    {
      title: "Usuários",
      href: "/dashboard/usuarios",
      icon: Users,
      roles: ["admin"],
    },
    {
      title: "Minha ONG",
      href: "/dashboard/minha-ong",
      icon: Building,
      roles: ["ong"],
    },
    {
      title: "Cadastrar ONG",
      href: "/dashboard/cadastrar-ong",
      icon: PlusCircle,
      roles: ["ong"],
    },
    {
      title: "Editar ONG",
      href: "/dashboard/editar-ong",
      icon: Edit,
      roles: ["ong"],
    },
    {
      title: "Perfil",
      href: "/dashboard/perfil",
      icon: Settings,
      roles: ["admin", "ong"],
    },
  ]

  // Filtrar os itens de navegação com base na role do usuário
  const filteredNavItems = navItems.filter((item) => !item.roles || item.roles.includes(userRole || ""))

  return (
    <div className="flex h-full w-full flex-col border-r bg-white dark:bg-gray-950 dark:border-gray-800">
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {filteredNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-blue-700 dark:hover:text-blue-500",
                pathname === item.href
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-500"
                  : "text-gray-700 dark:text-gray-300",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
