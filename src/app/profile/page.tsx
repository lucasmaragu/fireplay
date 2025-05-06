"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import Link from "next/link"

export default function ProfilePage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      toast.error("Las contraseñas no coinciden")
      return
    }
    setSaving(true)
    // aquí podrías llamar a tu API de actualización de usuario
    await new Promise((r) => setTimeout(r, 800))
    toast.success("Datos actualizados")
    setSaving(false)
  }

  // historial ficticio
  const historial = [
    { id: 1, date: "2025-04-21", total: 59.99, games: ["Cyberpunk 2077", "DLC Pack"] },
    { id: 2, date: "2025-03-10", total: 39.49, games: ["Elden Ring"] },
    { id: 3, date: "2025-02-05", total: 24.99, games: ["God of War Ragnarök"] },
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 pb-16">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 40%, rgba(220, 38, 38, 0.15), transparent 70%)",
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
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-500">person</span>
            </div>
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">Mi</span>
              <span className="text-red-500"> Perfil</span>
            </h1>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/30 rounded-xl overflow-hidden mb-8">
            <div className="flex border-b border-zinc-800/50">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "profile"
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-zinc-400 hover:text-zinc-300"
                }`}
              >
                <span className="material-symbols-outlined text-sm">settings</span>
                Configuración
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === "history"
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-zinc-400 hover:text-zinc-300"
                }`}
              >
                <span className="material-symbols-outlined text-sm">history</span>
                Historial
              </button>
            </div>

            <div className="p-6">
              {activeTab === "profile" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <form onSubmit={handleSubmit} className="w-full space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-zinc-300">Correo electrónico</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                            <span className="material-symbols-outlined text-sm">mail</span>
                          </span>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                            className="w-full py-3 pl-10 pr-4 bg-zinc-800/50 border border-zinc-700/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500/30 focus:border-zinc-700/50 text-zinc-300 placeholder:text-zinc-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-zinc-300">Nueva contraseña</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                            <span className="material-symbols-outlined text-sm">lock</span>
                          </span>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full py-3 pl-10 pr-4 bg-zinc-800/50 border border-zinc-700/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500/30 focus:border-zinc-700/50 text-zinc-300 placeholder:text-zinc-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-zinc-300">Confirmar contraseña</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                            <span className="material-symbols-outlined text-sm">lock</span>
                          </span>
                          <input
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            placeholder="••••••••"
                            className="w-full py-3 pl-10 pr-4 bg-zinc-800/50 border border-zinc-700/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500/30 focus:border-zinc-700/50 text-zinc-300 placeholder:text-zinc-600"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {saving ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                          Guardando...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm">save</span>
                          Actualizar datos
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl font-medium text-zinc-200 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">receipt_long</span>
                    Historial de Compras
                  </h2>

                  {historial.length === 0 ? (
                    <div className="text-center py-8">
                      <span className="material-symbols-outlined text-4xl text-zinc-700 mb-2">shopping_bag</span>
                      <p className="text-zinc-500">No tienes compras recientes</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {historial.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-zinc-800/50 border border-zinc-700/30 rounded-lg overflow-hidden"
                        >
                          <div className="flex justify-between items-center p-4 border-b border-zinc-700/30">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-zinc-400">receipt</span>
                              <span className="text-zinc-300 font-medium">Pedido #{item.id}</span>
                            </div>
                            <span className="text-zinc-400 text-sm">{item.date}</span>
                          </div>
                          <div className="p-4">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {item.games.map((game, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-zinc-700/50 text-zinc-300 text-xs rounded-full"
                                >
                                  {game}
                                </span>
                              ))}
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-zinc-400 text-sm">Total:</span>
                              <span className="text-zinc-200 font-medium">${item.total.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="bg-zinc-800/80 p-3 flex justify-end">
                            <Link
                              href={`/order/${item.id}`}
                              className="text-sm text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1"
                            >
                              Ver detalles
                              <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center"
          >
            <Link href="/games" className="flex items-center gap-2 text-zinc-400 hover:text-red-400 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
              Volver a Juegos
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

