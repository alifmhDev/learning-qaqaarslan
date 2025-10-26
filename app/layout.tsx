import type React from "react"
import "./globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "LearningQarslan - Online Learning Platform",
  description:
    "Discover and master professional courses in Power BI, Java, Azure, and more. Learn from industry experts with LearningQarslan.",
  keywords: "online learning, courses, Power BI, Java, Azure, programming, data analysis",
  authors: [{ name: "LearningQarslan" }],
  creator: "LearningQarslan",
  publisher: "LearningQarslan",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://learning-qaqaarslan.netlify.app",
    siteName: "LearningQarslan",
    title: "LearningQarslan - Online Learning Platform",
    description:
      "Discover and master professional courses in Power BI, Java, Azure, and more. Learn from industry experts with LearningQarslan.",
    images: [
      {
        url: "https://i.ibb.co.com/9kFVjVdb/image.png",
        width: 1200,
        height: 630,
        alt: "LearningQarslan - Online Learning Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LearningQarslan - Online Learning Platform",
    description: "Discover and master professional courses in Power BI, Java, Azure, and more.",
    images: ["https://i.ibb.co.com/9kFVjVdb/image.png"],
    creator: "@LearningQarslan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://learning-qaqaarslan.netlify.app",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
