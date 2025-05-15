"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loadingText?: string
    children: React.ReactNode
}

export function SubmitButton({
    children,
    loadingText = "Enviando...",
    className,
    disabled,
    ...props
}: SubmitButtonProps) {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            className={cn("w-full", className)}
            disabled={disabled || pending}
            {...props}
        >
            {pending ? loadingText : children}
        </Button>
    )
} 