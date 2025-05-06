"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { useCart } from "@/context/CartContext"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"

export default function CartPage() {
  const { cartItems, removeItem, clearCart, updateQuantity } = useCart()
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const [isClearing, setIsClearing] = useState(false)

  const handleRemoveItem = (id: number, name: string) => {
    removeItem(id)
    toast.success(`${name} eliminado del carrito`)
  }

  const handleClearCart = () => {
    setIsClearing(true)
    setTimeout(() => {
      clearCart()
      setIsClearing(false)
      toast.success("Carrito vaciado")
    }, 300)
  }

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      updateQuantity(id, newQuantity)
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 pb-16">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 70%, rgba(220, 38, 38, 0.15), transparent 70%)",
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 10 }).map((_, i) => (
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
              <span className="material-symbols-outlined text-red-500">shopping_cart</span>
            </div>
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">Tu</span>
              <span className="text-red-500"> Carrito</span>
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/30 rounded-xl p-12 text-center"
            >
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-6xl text-zinc-700 mb-4">shopping_cart</span>
                <h2 className="text-xl font-medium text-zinc-300 mb-2">Tu carrito está vacío</h2>
                <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                  Parece que aún no has añadido ningún juego a tu carrito. Explora nuestra colección y encuentra tu
                  próxima aventura.
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
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 mb-8"
              >
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/30 p-4 rounded-xl hover:border-zinc-700/50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 relative rounded-lg overflow-hidden border border-zinc-800/50">
                        <Image
                          src={item.image || "/placeholder.svg?height=80&width=80"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/game/${item.id}`}
                          className="text-lg font-medium text-zinc-200 hover:text-red-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <div className="text-zinc-400 flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-sm">payments</span>
                          ${item.price.toFixed(2)}
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-2 bg-zinc-700 rounded"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            min={1}
                            onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                            className="w-12 bg-zinc-800 border border-zinc-700 text-center text-zinc-300 rounded"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 bg-zinc-700 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 mt-4 sm:mt-0">
                      <button
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-800/70 text-zinc-400 hover:bg-red-500/20 hover:text-red-500 transition-colors"
                        aria-label="Eliminar"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/30 rounded-xl p-6"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-zinc-400 text-sm">
                      <span>Subtotal:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400 text-sm">
                      <span>Impuestos:</span>
                      <span>${(total * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t border-zinc-800/50 flex justify-between text-zinc-100 font-medium">
                      <span>Total:</span>
                      <span>${(total * 1.1).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:min-w-[200px]">
                    <Link
                      href="/checkout"
                      className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">payments</span>
                      Checkout
                    </Link>
                    <button
                      onClick={handleClearCart}
                      className="w-full py-3 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg text-zinc-300 font-medium hover:bg-zinc-700/80 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                      disabled={isClearing}
                    >
                      <span className="material-symbols-outlined">remove_shopping_cart</span>
                      Vaciar carrito
                    </button>
                  </div>
                </div>
              </motion.div>

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
                  Continuar comprando
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

