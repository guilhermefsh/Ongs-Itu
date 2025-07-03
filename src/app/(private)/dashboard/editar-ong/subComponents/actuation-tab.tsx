import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { UseFormReturn } from "react-hook-form"
import { EditOngFormData } from "../schema"
import { AreaOfAction, HelpType } from "@/hooks/use-edit-ong"

interface ActuationTabProps {
    form: UseFormReturn<EditOngFormData>
    areasOfActionOptions: AreaOfAction[]
    helpTypesOptions: HelpType[]
}

export function ActuationTab({ form, areasOfActionOptions, helpTypesOptions }: ActuationTabProps) {
    const watchedHelpTypes = form.watch("helpTypes")

    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="areasOfAction"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Áreas de Atuação *</FormLabel>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {areasOfActionOptions.map((area) => (
                                <div key={area.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`area-${area.id}`}
                                        checked={field.value.includes(area.id)}
                                        onCheckedChange={(checked) => {
                                            const newValue = checked
                                                ? [...field.value, area.id]
                                                : field.value.filter((id) => id !== area.id)
                                            field.onChange(newValue)
                                        }}
                                    />
                                    <label
                                        htmlFor={`area-${area.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                                    >
                                        {area.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="helpTypes"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Formas de Ajuda Aceitas</FormLabel>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {helpTypesOptions.map((forma) => (
                                <div key={forma.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`forma-${forma.id}`}
                                        checked={field.value.includes(forma.id)}
                                        onCheckedChange={(checked) => {
                                            const newValue = checked
                                                ? [...field.value, forma.id]
                                                : field.value.filter((id) => id !== forma.id)
                                            field.onChange(newValue)
                                        }}
                                    />
                                    <label
                                        htmlFor={`forma-${forma.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                                    >
                                        {forma.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {watchedHelpTypes.includes(1) && (
                <FormField
                    control={form.control}
                    name="volunteerDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Como ajudar - Voluntariado</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Descreva como as pessoas podem ajudar como voluntárias"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}

            {watchedHelpTypes.some((id) => [2, 3, 4, 5].includes(id)) && (
                <FormField
                    control={form.control}
                    name="donationDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Como ajudar - Doações</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Descreva como as pessoas podem ajudar com doações"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}

            {watchedHelpTypes.includes(6) && (
                <FormField
                    control={form.control}
                    name="partnershipDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Como ajudar - Parcerias</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Descreva como empresas podem estabelecer parcerias"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        </div>
    )
} 