"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Upload, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface MultiImageUploadProps {
    value: string[]
    onChange: (value: string[]) => void
    bucketName: string
    folderPath: string
    label?: string
    className?: string
    maxImages?: number
}

export function MultiImageUpload({
    value = [],
    onChange,
    bucketName,
    folderPath,
    label = "Upload images",
    className = "",
    maxImages = 10,
}: MultiImageUploadProps) {
    const [images, setImages] = useState<string[]>(value)
    const [loading, setLoading] = useState(false)
    const supabase = getSupabaseClient()

    useEffect(() => {
        setImages(value)
    }, [value])

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        // Check if adding these files would exceed the maximum
        if (images.length + files.length > maxImages) {
            alert(`You can only upload a maximum of ${maxImages} images.`)
            return
        }

        try {
            setLoading(true)
            const newImages: string[] = [...images]

            for (let i = 0; i < files.length; i++) {
                const file = files[i]

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
                    console.error("Error uploading image:", error)
                    continue
                }

                // Get public URL
                const {
                    data: { publicUrl },
                } = supabase.storage.from(bucketName).getPublicUrl(filePath)

                newImages.push(publicUrl)
            }

            setImages(newImages)
            onChange(newImages)
        } catch (error) {
            console.error("Error uploading images:", error)
            alert("Error uploading images. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = (index: number) => {
        const newImages = [...images]
        newImages.splice(index, 1)
        setImages(newImages)
        onChange(newImages)
    }

    return (
        <div className={`space-y-2 ${className}`}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-200">
                    {label} ({images.length}/{maxImages})
                </span>
            </div>

            {images.length > 0 && (
                <div className="mb-4">
                    <Carousel className="w-full">
                        <CarouselContent>
                            {images.map((image, index) => (
                                <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                                    <div className="relative aspect-video overflow-hidden rounded-md border border-border">
                                        <Image
                                            src={image || "/placeholder.svg"}
                                            alt={`Gallery image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleRemove(index)}
                                            className="absolute top-2 right-2 h-7 w-7"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                    </Carousel>
                </div>
            )}

            {images.length < maxImages && (
                <label className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border bg-background hover:bg-muted/50">
                    <div className="flex flex-col items-center justify-center gap-1 text-center">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">
                            {loading ? "Uploading..." : "Click to upload"}
                        </span>
                        <span className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 5MB per image.</span>
                    </div>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={loading} />
                </label>
            )}
        </div>
    )
}
