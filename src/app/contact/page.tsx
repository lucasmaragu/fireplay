"use client"

import { useState } from "react"
import toast from "react-hot-toast"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        toast.success("Mensaje enviado con éxito")
        setName(""); setEmail(""); setMessage("")
      } else {
        toast.error("Error al enviar mensaje")
      }
    } catch {
      toast.error("Error de red")
    }
    setSending(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Contacto</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <div>
          <label className="block mb-1">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full p-2 bg-zinc-800 rounded border border-zinc-700 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full p-2 bg-zinc-800 rounded border border-zinc-700 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-1">Mensaje</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            rows={5}
            className="w-full p-2 bg-zinc-800 rounded border border-zinc-700 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="w-full bg-red-500 hover:bg-red-600 py-2 rounded disabled:opacity-50 transition"
        >
          {sending ? "Enviando…" : "Enviar Mensaje"}
        </button>
      </form>
    </div>
  )
}