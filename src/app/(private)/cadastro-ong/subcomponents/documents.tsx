import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Documents() {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ *</Label>
                <Input id="cnpj" placeholder="00.000.000/0000-00" />
            </div>

            <div className="space-y-2">
                <Label htmlFor="estatuto">Estatuto Social</Label>
                <Input id="estatuto" type="file" accept=".pdf" />
                <p className="text-xs text-gray-500 dark:text-gray-400">Formato aceito: PDF. Tamanho máximo: 10MB.</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="ata">Ata de Eleição da Diretoria Atual</Label>
                <Input id="ata" type="file" accept=".pdf" />
                <p className="text-xs text-gray-500 dark:text-gray-400">Formato aceito: PDF. Tamanho máximo: 10MB.</p>
            </div>

            <div className="space-y-2">
                <Label>Certificações e Títulos</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="utilidade-publica-municipal" />
                        <label
                            htmlFor="utilidade-publica-municipal"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Utilidade Pública Municipal
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="utilidade-publica-estadual" />
                        <label
                            htmlFor="utilidade-publica-estadual"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Utilidade Pública Estadual
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="utilidade-publica-federal" />
                        <label
                            htmlFor="utilidade-publica-federal"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Utilidade Pública Federal
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="cebas" />
                        <label
                            htmlFor="cebas"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            CEBAS
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="oscip" />
                        <label
                            htmlFor="oscip"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            OSCIP
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="os" />
                        <label
                            htmlFor="os"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Organização Social (OS)
                        </label>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox id="termos" required />
                    <label
                        htmlFor="termos"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Declaro que todas as informações fornecidas são verdadeiras e que estou autorizado a representar
                        esta organização *
                    </label>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox id="privacidade" required />
                    <label
                        htmlFor="privacidade"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Concordo com a política de privacidade e autorizo o uso dos dados fornecidos para fins de
                        divulgação da ONG *
                    </label>
                </div>
            </div>
        </div>
    )
} 