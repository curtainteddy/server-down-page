import type React from "react"
import "@/styles/globals.css"
import { Space_Grotesk, Inter } from "next/font/google"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Peshal is here",
  description: "My personal station on the internet.",
  favicon: "/public/assets/images/meta/favicon.ico",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head> <link rel="favicon" href={metadata.favicon} /> </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans`}>{children}</body>
    </html>
  )
}



import './globals.css'