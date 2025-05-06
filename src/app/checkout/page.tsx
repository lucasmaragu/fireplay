"use client"

import React, { useState } from 'react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import Image from 'next/image'

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart()
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la integración real de pago
    clearCart()
    setOrderCompleted(true)
  }

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4">¡Gracias por tu compra!</h1>
        <p className="mb-6">Tu pedido ha sido procesado correctamente.</p>
        <Link href="/games" className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
          Seguir comprando
        </Link>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <Link href="/games" className="text-red-500 hover:underline">Ver juegos</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Resumen de pedido */}
        <div>
          <h2 className="text-xl font-medium mb-4">Resumen de tu pedido</h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-zinc-900 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 relative">
                    <Image src={item.image} alt={item.name} fill className="object-cover rounded" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-zinc-400">Cantidad: {item.quantity}</p>
                  </div>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
          </div>
        </div>

        {/* Formulario de datos */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-zinc-300 mb-1">Nombre completo</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-1">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-1">Dirección</label>
            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Confirmar compra
          </button>
        </form>
      </div>
    </div>
  )
}