import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { UseFormReturn } from "react-hook-form"
import { EditOngFormData } from "../schema"
import { Certification } from "@/hooks/use-edit-ong"

interface DocumentsTabProps {
    form: UseFormReturn<EditOngFormData>
    certificationsOptions: Certification[]
}

export function DocumentsTab({ form, certificationsOptions }: DocumentsTabProps) {
    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>CNPJ</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="00.000.000/0000-00"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="certifications"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Certificações e Títulos</FormLabel>
                        <div className="grid gap-2 sm:grid-cols-2">
                            {certificationsOptions.map((cert) => (
                                <div key={cert.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`cert-${cert.id}`}
                                        checked={field.value.includes(cert.id)}
                                        onCheckedChange={(checked) => {
                                            const newValue = checked
                                                ? [...field.value, cert.id]
                                                : field.value.filter((id) => id !== cert.id)
                                            field.onChange(newValue)
                                        }}
                                    />
                                    <label
                                        htmlFor={`cert-${cert.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200"
                                    >
                                        {cert.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
} 