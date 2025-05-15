"use client"

import Image from "next/image"
import { useTheme } from "@/components/theme-provider"

interface LogoProps {
    width?: number
    height?: number
}

export function Logo({ width = 120, height = 40 }: LogoProps) {
    const { theme } = useTheme()
    const LogoTheme = theme === "dark" ? "/logo_white.png" : "/logo_dark.png"
    return (
        <Image
            src={LogoTheme}
            alt="ONGs Itu Logo"
            width={width}
            height={height}
            priority
        />
    )
}
