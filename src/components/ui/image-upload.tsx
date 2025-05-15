"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSupabaseClient } from "@/lib/supabase/client"

interface ImageUploadProps {
    value: string | null
    onChange: (value: string | null) => void
    bucketName: string
    folderPath: string
    label?: string
    className?: string
}

export function ImageUpload({
    value,
    onChange,
    bucketName,
    folderPath,
    label = "Upload an image",
    className = "",
}: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(value)
    const [loading, setLoading] = useState(false)
    const supabase = getSupabaseClient()

    useEffect(() => {
        setPreview(value)
    }, [value])

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setLoading(true)

            // Create a unique file name
            const fileExt = file.name.split(".").pop()
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
            const filePath = `${folderPath}/${fileName}`

            // Upload file to Supabase Storage
            const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
            })

            if (error) {
                throw error
            }

            // Get public URL
            const {
                data: { publicUrl },
            } = supabase.storage.from(bucketName).getPublicUrl(filePath)

            setPreview(publicUrl)
            onChange(publicUrl)
        } catch (error) {
            console.error("Error uploading image:", error)
            alert("Error uploading image. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = () => {
        setPreview(null)
        onChange(null)
    }

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200">
                    {label}
                </span>
                {preview && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemove}
                        className="h-7 px-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                    >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                    </Button>
                )}
            </div>

            {preview ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border">
                    <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                </div>
            ) : (
                <label className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border bg-background hover:bg-muted/50">
                    <div className="flex flex-col items-center justify-center gap-1 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">
                            {loading ? "Uploading..." : "Click to upload"}
                        </span>
                        <span className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 5MB.</span>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={loading} />
                </label>
            )}
        </div>
    )
}
