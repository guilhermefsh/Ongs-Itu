import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ImageIcon } from "lucide-react"
import { Organization } from "../types"

interface ImagesTabProps {
    organization: Organization
    galleryImages: string[]
}

export function ImagesTab({ organization, galleryImages }: ImagesTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Imagens da ONG</CardTitle>
                <CardDescription>Logo, imagem de capa e galeria de fotos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {organization.logo_url ? (
                    <div>
                        <h3 className="text-lg font-medium mb-2">Logo</h3>
                        <div className="relative h-40 w-40 overflow-hidden rounded-md border border-border">
                            <Image src={organization.logo_url || "/placeholder.svg"} alt="Logo da ONG" fill className="object-contain" />
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-lg font-medium mb-2">Logo</h3>
                        <div className="flex h-40 w-40 items-center justify-center rounded-md border border-dashed border-border bg-muted">
                            <div className="flex flex-col items-center text-muted-foreground">
                                <ImageIcon className="h-10 w-10 mb-2" />
                                <span className="text-sm">Nenhuma logo</span>
                            </div>
                        </div>
                    </div>
                )}

                <Separator />

                {organization.imagem_capa_url ? (
                    <div>
                        <h3 className="text-lg font-medium mb-2">Imagem de Capa</h3>
                        <div className="relative aspect-video w-full overflow-hidden rounded-md border border-border">
                            <Image
                                src={organization.imagem_capa_url || "/placeholder.svg"}
                                alt="Imagem de capa"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-lg font-medium mb-2">Imagem de Capa</h3>
                        <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-border bg-muted">
                            <div className="flex flex-col items-center text-muted-foreground">
                                <ImageIcon className="h-10 w-10 mb-2" />
                                <span className="text-sm">Nenhuma imagem de capa</span>
                            </div>
                        </div>
                    </div>
                )}

                <Separator />

                <div>
                    <h3 className="text-lg font-medium mb-2">Galeria de Imagens</h3>
                    {galleryImages.length > 0 ? (
                        <Carousel className="w-full">
                            <CarouselContent>
                                {galleryImages.map((imagem, index) => (
                                    <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                                        <div className="relative aspect-video overflow-hidden rounded-md border border-border p-1">
                                            <Image
                                                src={imagem || "/placeholder.svg"}
                                                alt={`Imagem ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                        </Carousel>
                    ) : (
                        <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed border-border bg-muted">
                            <div className="flex flex-col items-center text-muted-foreground">
                                <ImageIcon className="h-10 w-10 mb-2" />
                                <span className="text-sm">Nenhuma imagem na galeria</span>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
} 