import { UseFormReturn } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type OngFormData } from "@/app/(private)/dashboard/cadastrar-ong/schema"

interface InformationTabProps {
    form: UseFormReturn<OngFormData>
}

export function InformationTab({ form }: InformationTabProps) {
    const { register, setValue, formState: { errors } } = form

    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name" className="dark:text-gray-200">
                        Nome da ONG *
                    </Label>
                    <Input
                        id="name"
                        placeholder="Nome oficial da organização"
                        {...register("name")}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="tradeName" className="dark:text-gray-200">
                        Nome Fantasia
                    </Label>
                    <Input
                        id="tradeName"
                        placeholder="Nome pelo qual a ONG é conhecida (se diferente)"
                        {...register("tradeName")}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="shortDescription" className="dark:text-gray-200">
                    Descrição Curta *
                </Label>
                <Textarea
                    id="shortDescription"
                    placeholder="Breve descrição da ONG (até 150 caracteres)"
                    maxLength={150}
                    {...register("shortDescription")}
                />
                {errors.shortDescription && (
                    <p className="text-sm text-red-500">{errors.shortDescription.message}</p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    Esta descrição será exibida nos cards e resultados de busca.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="fullDescription" className="dark:text-gray-200">
                    Descrição Completa *
                </Label>
                <Textarea
                    id="fullDescription"
                    placeholder="Descreva detalhadamente o trabalho da sua ONG, sua história, missão e valores"
                    className="min-h-[150px]"
                    {...register("fullDescription")}
                />
                {errors.fullDescription && (
                    <p className="text-sm text-red-500">{errors.fullDescription.message}</p>
                )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="foundingYear" className="dark:text-gray-200">
                        Ano de Fundação *
                    </Label>
                    <Input
                        id="foundingYear"
                        type="number"
                        placeholder="Ex: 2010"
                        min="1900"
                        max={new Date().getFullYear()}
                        {...register("foundingYear")}
                    />
                    {errors.foundingYear && (
                        <p className="text-sm text-red-500">{errors.foundingYear.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mainCause" className="dark:text-gray-200">
                        Causa Principal *
                    </Label>
                    <Select onValueChange={(value) => setValue("mainCause", value)}>
                        <SelectTrigger id="mainCause">
                            <SelectValue placeholder="Selecione a causa principal" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Educação">Educação</SelectItem>
                            <SelectItem value="Saúde">Saúde</SelectItem>
                            <SelectItem value="Meio Ambiente">Meio Ambiente</SelectItem>
                            <SelectItem value="Crianças">Crianças</SelectItem>
                            <SelectItem value="Idosos">Idosos</SelectItem>
                            <SelectItem value="Mulheres">Mulheres</SelectItem>
                            <SelectItem value="Animais">Animais</SelectItem>
                            <SelectItem value="Cultura">Cultura e Arte</SelectItem>
                            <SelectItem value="Esporte">Esporte</SelectItem>
                            <SelectItem value="Direitos Humanos">Direitos Humanos</SelectItem>
                            <SelectItem value="Assistência Social">Assistência Social</SelectItem>
                            <SelectItem value="Outra">Outra</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.mainCause && (
                        <p className="text-sm text-red-500">{errors.mainCause.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
} 