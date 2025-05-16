import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex items-center justify-center mt-10">
            <div className="text-center px-4">
                <h1 className="text-9xl font-bold text-blue-900">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mt-4">Página não encontrada</h2>
                <p className="text-gray-500 mt-2 mb-6">
                    Desculpe, não conseguimos encontrar a página que você está procurando.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Voltar para a página inicial
                </Link>
            </div>
        </div>
    )
} 