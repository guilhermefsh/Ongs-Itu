import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"

interface ProfileFormProps {
    form: UseFormReturn<any>
}

export function ProfileForm({ form }: ProfileFormProps) {
    return (
        <div className="flex-1 space-y-4">
            <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="seu.email@exemplo.com" {...field} />
                        </FormControl>
                        <FormDescription>
                            Ao alterar seu email, você receberá um link de confirmação.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
} 