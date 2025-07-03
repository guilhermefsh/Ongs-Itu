import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { ImageUpload } from "@/components/ui/image-upload"
import { MultiImageUpload } from "@/components/ui/multi-image-upload"
import { UseFormReturn } from "react-hook-form"
import { EditOngFormData } from "../schema"

interface ImagesTabProps {
    form: UseFormReturn<EditOngFormData>
    ongId: string | null
}

export function ImagesTab({ form, ongId }: ImagesTabProps) {
    if (!ongId) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">Carregando...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Logo da ONG</FormLabel>
                        <FormControl>
                            <ImageUpload
                                value={field.value}
                                onChange={field.onChange}
                                bucketName="ongs"
                                folderPath={`${ongId}/logo`}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="coverImageUrl"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Imagem de Capa</FormLabel>
                        <FormControl>
                            <ImageUpload
                                value={field.value}
                                onChange={field.onChange}
                                bucketName="ongs"
                                folderPath={`${ongId}/capa`}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="galleryImages"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Galeria de Imagens</FormLabel>
                        <FormControl>
                            <MultiImageUpload
                                value={field.value}
                                onChange={field.onChange}
                                bucketName="ongs"
                                folderPath={`${ongId}/galeria`}
                                maxImages={10}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
} 