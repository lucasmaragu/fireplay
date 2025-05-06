import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import toast from 'react-hot-toast'
import { useFavorites } from '@/context/FavoritesContext'

type Game = {
  id: number
  name: string
  background_image: string
  released: string
  rating?: number
}

export default function GameCard({ game }: { game: Game }) {
  const { addItem } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const formattedDate = new Date(game.released).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="group relative overflow-hidden bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/30 rounded-lg transition-all duration-300 w-full max-w-xs hover:border-zinc-700/50">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 z-10" />

      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={game.background_image || "/placeholder.svg?height=400&width=300"}
          alt={game.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, 300px"
        />

        {game.rating && (
          <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 z-20">
            <span className="material-symbols-outlined text-xs text-amber-400">star</span>
            <span className="text-xs font-medium text-zinc-200">{game.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <div className="relative p-4 z-20">
        <h2 className="text-zinc-100 text-lg font-medium line-clamp-1 group-hover:text-red-400 transition-colors">
          {game.name}
        </h2>

        <div className="flex items-center mt-2 gap-x-1 text-zinc-500">
          <span className="material-symbols-outlined text-sm">calendar_today</span>
          <p className="text-sm">{formattedDate}</p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Link
            href={`/game/${game.id}`}
            className="px-3 py-1.5 bg-zinc-800 hover:bg-red-500 text-zinc-300 hover:text-white text-sm font-medium rounded-md transition-colors"
          >
            View Details
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => {
                addItem({ id: game.id, name: game.name, image: game.background_image, price: Math.floor(Math.random() * 50) + 10, quantity: 1 })
                toast.success('Añadido al carrito')
              }}
              className="p-1.5 bg-zinc-800/70 hover:bg-zinc-700 rounded-md w-7 h-7 transition-colors flex items-center justify-center text-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-zinc-500 hover:text-zinc-300 text-lg transition-colors">
                shopping_cart
              </span>
            </button>
            <button
              onClick={() => {
                const wasFav = isFavorite(game.id)
                toggleFavorite({ id: game.id, name: game.name, image: game.background_image })
                toast(wasFav ? 'Eliminado de favoritos' : 'Añadido a favoritos')
              }}
              className="p-1.5 rounded-md w-7 h-7 transition-colors flex items-center justify-center cursor-pointer"
              style={{ background: 'rgba(56, 56, 56, 0.3)' }}
            >
              <span className="material-symbols-outlined text-lg"
                style={{ color: isFavorite(game.id) ? 'crimson' : 'rgba(156, 163, 175, 1)' }}
              >
                favorite
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
