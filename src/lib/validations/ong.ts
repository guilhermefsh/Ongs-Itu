import { z } from "zod"

export const ongSchema = z.object({
    // Basic Information
    name: z.string().min(1, "Name is required"),
    tradeName: z.string().optional(),
    shortDescription: z.string().min(1, "Short description is required").max(150, "Maximum 150 characters"),
    fullDescription: z.string().min(1, "Full description is required"),
    foundingYear: z.string().min(1, "Founding year is required")
        .refine((val) => {
            const year = parseInt(val)
            return year >= 1900 && year <= new Date().getFullYear()
        }, "Invalid founding year"),
    cause: z.string().min(1, "Cause is required"),
    targetAudience: z.string().optional(),

    // Contact Information
    email: z.string().email("Invalid email"),
    phone: z.string().optional(),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    address: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().optional(),
    responsiblePerson: z.string().min(1, "Responsible person is required"),
    responsibleRole: z.string().min(1, "Responsible role is required"),

    // Documents
    cnpj: z.string().optional(),

    // Images
    logoUrl: z.string().nullable(),
    coverImageUrl: z.string().nullable(),
    galleryImages: z.array(z.string()),

    // Areas and Help
    areasOfAction: z.array(z.number()),
    helpTypes: z.array(z.number()),
    volunteerDescription: z.string().optional(),
    donationDescription: z.string().optional(),
    partnershipDescription: z.string().optional(),

    // Certifications
    certifications: z.array(z.number())
})

export type OngFormData = z.infer<typeof ongSchema>

export const CAUSES = [
    { value: "Education", label: "Educação" },
    { value: "Health", label: "Saúde" },
    { value: "Environment", label: "Meio Ambiente" },
    { value: "Children", label: "Crianças" },
    { value: "Elderly", label: "Idosos" },
    { value: "Women", label: "Mulheres" },
    { value: "Animals", label: "Animais" },
    { value: "Culture", label: "Cultura e Arte" },
    { value: "Sports", label: "Esporte" },
    { value: "HumanRights", label: "Direitos Humanos" },
    { value: "SocialAssistance", label: "Assistência Social" },
    { value: "Other", label: "Outra" }
] as const 