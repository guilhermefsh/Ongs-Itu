import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/site-header"
import { Footer } from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ONGs Itu - Conectando pessoas e causas",
  description: "Plataforma para conectar ONGs e iniciativas sociais de Itu com pessoas que desejam ajudar.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
}

function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        const storedTheme = localStorage.getItem('theme')
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        const theme = storedTheme || systemTheme
        document.documentElement.classList.add(theme)
      } catch (e) {}
    })()
  `

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
