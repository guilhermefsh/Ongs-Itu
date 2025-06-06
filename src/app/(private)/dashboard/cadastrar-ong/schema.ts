import { z } from "zod"

export const ongSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    tradeName: z.string().optional(),
    shortDescription: z.string().min(10, "Descrição curta deve ter pelo menos 10 caracteres").max(150, "Descrição curta deve ter no máximo 150 caracteres"),
    fullDescription: z.string().min(50, "Descrição completa deve ter pelo menos 50 caracteres"),
    foundingYear: z.string().refine((val) => {
        const year = parseInt(val)
        return year >= 1900 && year <= new Date().getFullYear()
    }, "Ano de fundação inválido"),
    mainCause: z.string().min(1, "Selecione uma causa principal"),

    email: z.string().email("E-mail inválido"),
    phone: z.string().optional(),
    website: z.string().url("URL inválida").optional().or(z.literal("")),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    address: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().default("Itu"),
    state: z.string().default("SP"),
    zipCode: z.string().optional(),
    responsibleName: z.string().min(3, "Nome do responsável deve ter pelo menos 3 caracteres"),
    responsibleRole: z.string().min(3, "Cargo do responsável deve ter pelo menos 3 caracteres"),

    areasOfAction: z.array(z.number()).min(1, "Selecione pelo menos uma área de atuação"),
    helpTypes: z.array(z.number()),
    volunteerDescription: z.string().optional(),
    donationDescription: z.string().optional(),
    partnershipDescription: z.string().optional(),

    cnpj: z.string().optional(),
    certifications: z.array(z.number()),
    termsAccepted: z.boolean().refine((val) => val === true, "Você precisa aceitar os termos"),
    privacyAccepted: z.boolean().refine((val) => val === true, "Você precisa aceitar a política de privacidade"),
})

export type OngFormData = z.infer<typeof ongSchema> 