"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface HeaderProps {
  onRefresh: () => void
}

export default function Header({ onRefresh }: HeaderProps) {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    if (!mounted) return
    const html = document.documentElement
    const newIsDark = !isDark

    if (newIsDark) {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }

    setIsDark(newIsDark)
  }

  const handleRefresh = () => {
    onRefresh()
    setIsMenuOpen(false)
  }

  const handleThemeToggle = () => {
    toggleTheme()
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">LearningQarslan</h1>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onRefresh}
                title="Refresh courses"
                className="hover:bg-muted"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </Button>

              <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle theme" className="hover:bg-muted">
                {mounted && isDark ? (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </Button>
            </div>

            <div className="md:hidden relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                title="Menu"
                className="h-9 w-9 hover:bg-muted"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-background shadow-lg">
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none px-4 py-2 hover:bg-muted"
                    onClick={handleRefresh}
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Refresh
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none px-4 py-2 hover:bg-muted"
                    onClick={handleThemeToggle}
                  >
                    {mounted && isDark ? (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                        Light Mode
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Dark Mode
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
