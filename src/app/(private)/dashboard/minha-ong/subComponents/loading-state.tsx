export function LoadingState() {
    return (
        <div className="container mx-auto py-6">
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
                    <p className="text-gray-500 dark:text-gray-400">Carregando dados da ONG...</p>
                </div>
            </div>
        </div>
    )
} 