// eslint-disable react/only-export-components -- context files export hooks alongside providers
import { useState, useEffect } from 'react'

import { useMediaQuery } from '@/hooks/use-media-query'
import { createContext } from '@/lib/context'
export type Theme = 'dark' | 'light' | 'system'

export const [useTheme, ThemeContext] = createContext<{
  theme: Theme
  resolvedTheme: Exclude<Theme, 'system'>
  setTheme: (theme: Theme) => void
}>({
  name: 'Theme',
  defaultValue: {
    theme: 'system',
    resolvedTheme: 'light',
    setTheme: () => null,
  },
})

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      return root.classList.add(isDarkMode ? 'dark' : 'light')
    }

    root.classList.add(theme)
  }, [theme, isDarkMode])

  return (
    <ThemeContext
      {...props}
      value={{
        theme,
        resolvedTheme: theme === 'system' ? (isDarkMode ? 'dark' : 'light') : theme,
        setTheme: (theme) => {
          localStorage.setItem(storageKey, theme)
          setTheme(theme)
        },
      }}
    >
      {children}
    </ThemeContext>
  )
}
