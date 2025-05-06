"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

type MiniGame = {
  id: number
  name: string
  background_image: string
}

export default function MiniGameCard({ game }: { game: MiniGame }) {
  return (
    <Link
      href={`/game/${game.id}`}
      className="flex items-center gap-4 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors rounded-lg p-2"
    >
      <div className="relative w-20 h-12 flex-shrink-0">
        <Image
          src={game.background_image || "/placeholder.svg?height=80&width=120"}
          alt={game.name}
          fill
          className="object-cover rounded"
          sizes="80px"
        />
      </div>
      <p className="text-zinc-100 font-medium line-clamp-1">{game.name}</p>
    </Link>
  )
}