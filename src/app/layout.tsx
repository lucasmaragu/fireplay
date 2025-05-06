import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import { AuthProvider } from "@/context/AuthContext"
import { CartProvider } from "@/context/CartContext"
import { FavoritesProvider } from '@/context/FavoritesContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FIREPLAY - Modern Gaming Platform",
  description: "Discover and explore your favorite games",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`h-screen bg-black text-zinc-100`}>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              {/* Toaster para notificaciones */}
              <Toaster
                position="top-right"
                toastOptions={{
                  style: { background: '#333', color: '#fff' },
                  duration: 3000
                }}
              />
              <Header />
              {children}
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
