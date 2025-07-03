"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMyOng } from "@/hooks/use-my-ong"
import {
    LoadingState,
    ErrorState,
    NoOngState,
    OngHeader,
    StatusAlerts,
    InformationTab,
    ImagesTab,
    ContactTab,
    ActuationTab,
    DocumentsTab
} from "./subComponents"

export default function MyOngPage() {
    const {
        loading,
        error,
        organization,
        areas,
        helpForms,
        certifications,
        galleryImages,
        getStatusBadge,
        handleEditOng,
        handleViewPublicPage,
        handleCadastrarOng
    } = useMyOng()

    if (loading) {
        return <LoadingState />
    }

    if (error) {
        return <ErrorState error={error} />
    }

    if (!organization) {
        return <NoOngState onCadastrarOng={handleCadastrarOng} />
    }

    return (
        <div className="container mx-auto py-6">
            <OngHeader
                organization={organization}
                getStatusBadge={getStatusBadge}
                onViewPublicPage={handleViewPublicPage}
                onEditOng={handleEditOng}
            />

            <StatusAlerts status={organization.status} />

            <Tabs defaultValue="informacoes" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                    <TabsTrigger value="informacoes">Informações</TabsTrigger>
                    <TabsTrigger value="imagens">Imagens</TabsTrigger>
                    <TabsTrigger value="contato">Contato</TabsTrigger>
                    <TabsTrigger value="atuacao">Atuação</TabsTrigger>
                    <TabsTrigger value="documentos">Documentos</TabsTrigger>
                </TabsList>

                <TabsContent value="informacoes">
                    <InformationTab organization={organization} />
                </TabsContent>

                <TabsContent value="imagens">
                    <ImagesTab organization={organization} galleryImages={galleryImages} />
                </TabsContent>

                <TabsContent value="contato">
                    <ContactTab organization={organization} />
                </TabsContent>

                <TabsContent value="atuacao">
                    <ActuationTab areas={areas} helpForms={helpForms} />
                </TabsContent>

                <TabsContent value="documentos">
                    <DocumentsTab organization={organization} certifications={certifications} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
