import type React from "react"
import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { ThemeProvider } from "@/components/theme-provider"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await getSupabaseServer()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (!user || error) {
    redirect("/auth/login")
  }

  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex min-h-screen flex-col">
        <DashboardHeader>
          <DashboardSidebar />
        </DashboardHeader>
        <div className="flex flex-1">
          <div className="hidden w-64 md:block">
            <DashboardSidebar />
          </div>
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
