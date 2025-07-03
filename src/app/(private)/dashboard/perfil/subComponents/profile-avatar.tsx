import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { ImageUpload } from "@/components/ui/image-upload"
import { UseFormReturn } from "react-hook-form"

interface ProfileAvatarProps {
    form: UseFormReturn<any>
    onUpload: (file: File) => Promise<string | null>
}

export function ProfileAvatar({ form, onUpload }: ProfileAvatarProps) {
    return (
        <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
                <AvatarImage
                    src={form.watch("avatar_url") || ""}
                    alt={form.watch("nome")}
                />
                <AvatarFallback className="text-2xl">
                    {form.watch("nome")?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
            </Avatar>

            <FormField
                control={form.control}
                name="avatar_url"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <ImageUpload
                                value={field.value || ""}
                                onChange={field.onChange}
                                bucketName="avatars"
                                folderPath="avatars"
                                label="Alterar Avatar"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
} 