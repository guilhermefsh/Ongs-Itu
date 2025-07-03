import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { EditOngFormData } from "../schema"

interface InformationTabProps {
    form: UseFormReturn<EditOngFormData>
}

export function InformationTab({ form }: InformationTabProps) {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome da ONG *</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome oficial da organização" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tradeName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome Fantasia</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome pelo qual a ONG é conhecida (se diferente)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Descrição Curta *</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Breve descrição da ONG (até 150 caracteres)"
                                maxLength={150}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="fullDescription"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Descrição Completa *</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Descreva detalhadamente o trabalho da sua ONG, sua história, missão e valores"
                                className="min-h-[150px]"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                    control={form.control}
                    name="foundingYear"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ano de Fundação *</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Ex: 2010"
                                    min="1900"
                                    max={new Date().getFullYear()}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="mainCause"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Causa Principal *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione a causa principal" />
                                    </SelectTrigger>
                                </FormControl>
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
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Público Alvo</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Descreva o público-alvo da sua ONG"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
} 