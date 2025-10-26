"use client"

import type React from "react"

import { useEffect, useState } from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark")
    } else if (savedTheme === "dark" || prefersDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }, [])

  if (!mounted) return <>{children}</>

  return <>{children}</>
}
