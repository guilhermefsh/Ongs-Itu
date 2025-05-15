import { Loader2 } from "lucide-react"

export default function PerfilLoading() {
    return (
        <div className="container py-10">
            <div className="flex h-[400px] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        </div>
    )
}
