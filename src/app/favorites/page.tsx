"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useFavorites } from "@/context/FavoritesContext"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites()
  const [removingId, setRemovingId] = useState<number | null>(null)

  const handleRemoveFavorite = (item: any) => {
    setRemovingId(item.id)
    setTimeout(() => {
      toggleFavorite(item)
      toast("Favorito eliminado", { icon: "🗑️" })
      setRemovingId(null)
    }, 300)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 pb-16">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 80% 30%, rgba(220, 38, 38, 0.15), transparent 70%)",
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-red-500 opacity-70"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [Math.random() * 0.5 + 0.2, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.2],
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-500">favorite</span>
            </div>
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">Tus</span>
              <span className="text-red-500"> Favoritos</span>
            </h1>
          </div>

          {favorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/30 rounded-xl p-12 text-center"
            >
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-6xl text-zinc-700 mb-4">favorite</span>
                <h2 className="text-xl font-medium text-zinc-300 mb-2">No tienes favoritos aún</h2>
                <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                  Explora nuestra colección de juegos y marca tus favoritos para acceder a ellos rápidamente.
                </p>
                <Link
                  href="/games"
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg shadow-red-500/20 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">videogame_asset</span>
                  Explorar Juegos
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: removingId === item.id ? 0 : 1,
                    y: removingId === item.id ? -20 : 0,
                    scale: removingId === item.id ? 0.95 : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: removingId === item.id ? 0 : index * 0.05,
                  }}
                  className="group bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/30 rounded-xl overflow-hidden hover:border-zinc-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/5 flex flex-col"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                    <Image
                      src={item.image || "/placeholder.svg?height=300&width=400"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <button
                      onClick={() => handleRemoveFavorite(item)}
                      className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-zinc-400 hover:bg-red-500/80 hover:text-white transition-colors"
                      aria-label="Eliminar de favoritos"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-lg font-medium mb-2 text-zinc-200 group-hover:text-red-400 transition-colors line-clamp-1">
                      {item.name}
                    </h2>

                    <div className="mt-auto pt-4 flex justify-between items-center">
                      <Link
                        href={`/game/${item.id}`}
                        className="px-4 py-2 bg-zinc-800/80 backdrop-blur-sm hover:bg-red-500 text-zinc-300 hover:text-white text-sm font-medium rounded-lg transition-colors duration-300 flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        Ver Detalles
                      </Link>
                      <button
                        onClick={() => handleRemoveFavorite(item)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800/70 text-zinc-400 hover:bg-red-500/20 hover:text-red-500 transition-colors"
                        aria-label="Eliminar de favoritos"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {favorites.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex justify-center"
            >
              <Link
                href="/games"
                className="flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Volver a Juegos
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
