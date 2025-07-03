import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function Actuation() {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Áreas de Atuação *</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="educacao" />
                        <label
                            htmlFor="educacao"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Educação
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="saude" />
                        <label
                            htmlFor="saude"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Saúde
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="meio-ambiente" />
                        <label
                            htmlFor="meio-ambiente"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Meio Ambiente
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="criancas" />
                        <label
                            htmlFor="criancas"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Crianças e Adolescentes
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="idosos" />
                        <label
                            htmlFor="idosos"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Idosos
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="mulheres" />
                        <label
                            htmlFor="mulheres"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Mulheres
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="animais" />
                        <label
                            htmlFor="animais"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Animais
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="cultura" />
                        <label
                            htmlFor="cultura"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Cultura e Arte
                        </label>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="publico-alvo">Público-alvo *</Label>
                <Textarea id="publico-alvo" placeholder="Descreva o público que sua ONG atende" />
            </div>

            <div className="space-y-2">
                <Label>Formas de Ajuda Aceitas</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="voluntariado" />
                        <label
                            htmlFor="voluntariado"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Voluntariado
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="doacao-financeira" />
                        <label
                            htmlFor="doacao-financeira"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Doação Financeira
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="doacao-alimentos" />
                        <label
                            htmlFor="doacao-alimentos"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Doação de Alimentos
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="doacao-roupas" />
                        <label
                            htmlFor="doacao-roupas"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Doação de Roupas
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="doacao-materiais" />
                        <label
                            htmlFor="doacao-materiais"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Doação de Materiais
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="parcerias" />
                        <label
                            htmlFor="parcerias"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Parcerias Empresariais
                        </label>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="como-ajudar-voluntariado">Como ajudar - Voluntariado</Label>
                <Textarea
                    id="como-ajudar-voluntariado"
                    placeholder="Descreva como as pessoas podem ajudar como voluntárias"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="como-ajudar-doacao">Como ajudar - Doações</Label>
                <Textarea id="como-ajudar-doacao" placeholder="Descreva como as pessoas podem ajudar com doações" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="como-ajudar-parceria">Como ajudar - Parcerias</Label>
                <Textarea
                    id="como-ajudar-parceria"
                    placeholder="Descreva como empresas podem estabelecer parcerias"
                />
            </div>
        </div>
    )
} 