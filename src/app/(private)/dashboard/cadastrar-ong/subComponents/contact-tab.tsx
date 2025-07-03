import { UseFormReturn } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type OngFormData } from "@/app/(private)/dashboard/cadastrar-ong/schema"

interface ContactTabProps {
    form: UseFormReturn<OngFormData>
}

export function ContactTab({ form }: ContactTabProps) {
    const { register, formState: { errors } } = form

    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="email" className="dark:text-gray-200">
                        E-mail *
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="contato@suaong.org.br"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone" className="dark:text-gray-200">
                        Telefone
                    </Label>
                    <Input
                        id="phone"
                        placeholder="(11) 99999-9999"
                        {...register("phone")}
                        onChange={(e) => {
                            e.target.value = e.target.value
                                .replace(/\D/g, "")
                                .replace(/^(\d{2})(\d)/g, "($1) $2")
                                .replace(/(\d)(\d{4})$/, "$1-$2");
                        }}
                        maxLength={15}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="website" className="dark:text-gray-200">
                    Site
                </Label>
                <Input
                    id="website"
                    type="url"
                    placeholder="https://www.suaong.org.br"
                    {...register("website")}
                />
                {errors.website && (
                    <p className="text-sm text-red-500">{errors.website.message}</p>
                )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="facebook" className="dark:text-gray-200">
                        Facebook
                    </Label>
                    <Input
                        id="facebook"
                        placeholder="facebook.com/suaong"
                        {...register("facebook")}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="instagram" className="dark:text-gray-200">
                        Instagram
                    </Label>
                    <Input
                        id="instagram"
                        placeholder="instagram.com/suaong"
                        {...register("instagram")}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="dark:text-gray-200">Endereço</Label>
                <Input
                    placeholder="Rua/Avenida"
                    className="mb-2"
                    {...register("address")}
                />
                <div className="grid gap-2 sm:grid-cols-3">
                    <Input placeholder="Número" {...register("number")} />
                    <Input placeholder="Complemento" {...register("complement")} />
                    <Input placeholder="Bairro" {...register("neighborhood")} />
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                    <Input placeholder="Cidade" {...register("city")} />
                    <Input placeholder="Estado" {...register("state")} />
                    <Input placeholder="CEP" {...register("zipCode")} />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="responsibleName" className="dark:text-gray-200">
                    Nome do Responsável *
                </Label>
                <Input
                    id="responsibleName"
                    placeholder="Nome completo do responsável pela ONG"
                    {...register("responsibleName")}
                />
                {errors.responsibleName && (
                    <p className="text-sm text-red-500">{errors.responsibleName.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="responsibleRole" className="dark:text-gray-200">
                    Cargo do Responsável *
                </Label>
                <Input
                    id="responsibleRole"
                    placeholder="Ex: Presidente, Diretor, Coordenador"
                    {...register("responsibleRole")}
                />
                {errors.responsibleRole && (
                    <p className="text-sm text-red-500">{errors.responsibleRole.message}</p>
                )}
            </div>
        </div>
    )
} 