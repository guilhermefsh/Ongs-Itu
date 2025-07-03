import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"

interface PasswordFormProps {
    form: UseFormReturn<any>
}

export function PasswordForm({ form }: PasswordFormProps) {
    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="senha_atual"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Senha Atual</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="nova_senha"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nova Senha</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="confirmar_senha"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirmar Nova Senha</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
} 