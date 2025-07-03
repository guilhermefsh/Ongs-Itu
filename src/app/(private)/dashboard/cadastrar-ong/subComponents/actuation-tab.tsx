import { UseFormReturn } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { type OngFormData } from "@/app/(private)/dashboard/cadastrar-ong/schema"

interface AtuacaoTabProps {
    form: UseFormReturn<OngFormData>
    initialData: {
        areasAtuacao: { id: number; nome: string }[]
        formasAjuda: { id: number; nome: string }[]
    }
    helpTypes: number[]
    handleAreaChange: (areaId: number, checked: boolean) => void
    handleHelpTypeChange: (helpTypeId: number, checked: boolean) => void
}

export function ActuationTab({
    form,
    initialData,
    helpTypes,
    handleAreaChange,
    handleHelpTypeChange
}: AtuacaoTabProps) {
    const { register, watch, formState: { errors } } = form

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="dark:text-gray-200">Áreas de Atuação *</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                    {initialData.areasAtuacao.map((area) => (
                        <div key={area.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`area-${area.id}`}
                                checked={watch("areasOfAction").includes(area.id)}
                                onCheckedChange={(checked) => handleAreaChange(area.id, checked as boolean)}
                            />
                            <label
                                htmlFor={`area-${area.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                            >
                                {area.nome}
                            </label>
                        </div>
                    ))}
                </div>
                {errors.areasOfAction && (
                    <p className="text-sm text-red-500">{errors.areasOfAction.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label className="dark:text-gray-200">Formas de Ajuda Aceitas</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                    {initialData.formasAjuda.map((forma) => (
                        <div key={forma.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`forma-${forma.id}`}
                                checked={helpTypes.includes(forma.id)}
                                onCheckedChange={(checked) => handleHelpTypeChange(forma.id, checked as boolean)}
                            />
                            <label
                                htmlFor={`forma-${forma.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                            >
                                {forma.nome}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {helpTypes.includes(1) && (
                <div className="space-y-2">
                    <Label htmlFor="volunteerDescription" className="dark:text-gray-200">
                        Como ajudar - Voluntariado
                    </Label>
                    <Textarea
                        id="volunteerDescription"
                        placeholder="Descreva como as pessoas podem ajudar como voluntárias"
                        {...register("volunteerDescription")}
                    />
                </div>
            )}

            {helpTypes.some((id) => [2, 3, 4, 5].includes(id)) && (
                <div className="space-y-2">
                    <Label htmlFor="donationDescription" className="dark:text-gray-200">
                        Como ajudar - Doações
                    </Label>
                    <Textarea
                        id="donationDescription"
                        placeholder="Descreva como as pessoas podem ajudar com doações"
                        {...register("donationDescription")}
                    />
                </div>
            )}

            {helpTypes.includes(6) && (
                <div className="space-y-2">
                    <Label htmlFor="partnershipDescription" className="dark:text-gray-200">
                        Como ajudar - Parcerias
                    </Label>
                    <Textarea
                        id="partnershipDescription"
                        placeholder="Descreva como empresas podem estabelecer parcerias"
                        {...register("partnershipDescription")}
                    />
                </div>
            )}
        </div>
    )
} 