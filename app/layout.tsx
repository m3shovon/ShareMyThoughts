import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"
import Head from "next/head"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Vlogspot - Share Your Thoughts",
  description: "A social platform for sharing thoughts and experiences",
  generator: 'M3S',
  icons: {
    icon: "../public/vlogspot-logo.png",
    shortcut: "../public/vlogspot-logo.png",
    apple: "../public/vlogspot-logo.png", 
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="../public/vlogspot-logo.png" />
      </Head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
