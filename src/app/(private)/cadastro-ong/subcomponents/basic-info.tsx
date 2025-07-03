import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function BasicInfo() {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="nome">Nome da ONG *</Label>
                    <Input id="nome" placeholder="Nome oficial da organização" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="nome-fantasia">Nome Fantasia</Label>
                    <Input id="nome-fantasia" placeholder="Nome pelo qual a ONG é conhecida (se diferente)" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="descricao-curta">Descrição Curta *</Label>
                <Textarea
                    id="descricao-curta"
                    placeholder="Breve descrição da ONG (até 150 caracteres)"
                    maxLength={150}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Esta descrição será exibida nos cards e resultados de busca.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="descricao-completa">Descrição Completa *</Label>
                <Textarea
                    id="descricao-completa"
                    placeholder="Descreva detalhadamente o trabalho da sua ONG, sua história, missão e valores"
                    className="min-h-[150px]"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="ano-fundacao">Ano de Fundação *</Label>
                <Input
                    id="ano-fundacao"
                    type="number"
                    placeholder="Ex: 2010"
                    min="1900"
                    max={new Date().getFullYear()}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="logo">Logo da ONG</Label>
                <Input id="logo" type="file" accept="image/*" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Formatos aceitos: JPG, PNG. Tamanho máximo: 2MB.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="imagem-capa">Imagem de Capa</Label>
                <Input id="imagem-capa" type="file" accept="image/*" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Esta imagem será exibida no topo da página da sua ONG. Formatos aceitos: JPG, PNG. Tamanho máximo:
                    5MB.
                </p>
            </div>
        </div>
    )
} 