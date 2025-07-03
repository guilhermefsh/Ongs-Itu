import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  const checkIsMobile = React.useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
  }, [])

  const mediaQuery = React.useMemo(() =>
    window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`),
    []
  )

  React.useEffect(() => {
    const onChange = () => {
      checkIsMobile()
    }

    mediaQuery.addEventListener("change", onChange)
    checkIsMobile()

    return () => mediaQuery.removeEventListener("change", onChange)
  }, [mediaQuery, checkIsMobile])

  return !!isMobile
}
