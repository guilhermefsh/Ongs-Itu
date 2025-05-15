import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Logo width={140} height={80} />
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Aliança Ituana</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Conectando pessoas e organizações para transformar nossa comunidade.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 transition-colors hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/ongs"
                  className="text-gray-600 transition-colors hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  ONGs
                </Link>
              </li>
              <li>
                <Link
                  href="/como-ajudar"
                  className="text-gray-600 transition-colors hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Como Ajudar
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-gray-600 transition-colors hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/cadastro-ong"
                  className="text-gray-600 transition-colors hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  Cadastrar ONG
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Redes Sociais</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-600 transition-colors hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 transition-colors hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-600 transition-colors hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="mailto:contato@ongsitu.com.br"
                className="text-gray-600 transition-colors hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Aliança Ituana. Todos os direitos reservados. Projeto Escolar.
          </p>
        </div>
      </div>
    </footer>
  )
}
