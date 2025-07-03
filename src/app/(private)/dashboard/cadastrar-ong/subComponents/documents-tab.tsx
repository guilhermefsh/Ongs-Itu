import { UseFormReturn } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type OngFormData } from "@/app/(private)/dashboard/cadastrar-ong/schema"

interface DocumentsTabProps {
    form: UseFormReturn<OngFormData>
    initialData: {
        certificacoes: { id: number; nome: string }[]
    }
    handleCertificationChange: (certId: number, checked: boolean) => void
}

export function DocumentsTab({
    form,
    initialData,
    handleCertificationChange
}: DocumentsTabProps) {
    const { register, watch, setValue, formState: { errors } } = form

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="cnpj" className="dark:text-gray-200">
                    CNPJ
                </Label>
                <Input
                    id="cnpj"
                    placeholder="00.000.000/0000-00"
                    {...register("cnpj")}
                />
            </div>

            <div className="space-y-2">
                <Label className="dark:text-gray-200">Certificações e Títulos</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                    {initialData.certificacoes.map((cert) => (
                        <div key={cert.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`cert-${cert.id}`}
                                checked={watch("certifications").includes(cert.id)}
                                onCheckedChange={(checked) => handleCertificationChange(cert.id, checked as boolean)}
                            />
                            <label
                                htmlFor={`cert-${cert.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                            >
                                {cert.nome}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="termsAccepted"
                        checked={watch("termsAccepted")}
                        onCheckedChange={(checked) => setValue("termsAccepted", checked as boolean)}
                    />
                    <label
                        htmlFor="termsAccepted"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                    >
                        Declaro que todas as informações fornecidas são verdadeiras e que estou autorizado a representar
                        esta organização *
                    </label>
                </div>
                {errors.termsAccepted && (
                    <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="privacyAccepted"
                        checked={watch("privacyAccepted")}
                        onCheckedChange={(checked) => setValue("privacyAccepted", checked as boolean)}
                    />
                    <label
                        htmlFor="privacyAccepted"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                    >
                        Concordo com a política de privacidade e autorizo o uso dos dados fornecidos para fins de
                        divulgação da ONG *
                    </label>
                </div>
                {errors.privacyAccepted && (
                    <p className="text-sm text-red-500">{errors.privacyAccepted.message}</p>
                )}
            </div>
        </div>
    )
} 