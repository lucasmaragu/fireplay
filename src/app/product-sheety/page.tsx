"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import toast from 'react-hot-toast'

// Tipos para las reseñas simuladas
type Review = {
  id: number
  author: string
  avatar: string
  rating: number
  date: string
  content: string
}

// Generar reseñas simuladas
const generateReviews = (gameName: string): Review[] => {
  const reviewTemplates = [
    {
      author: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      content: `${gameName} es absolutamente increíble. La jugabilidad es fluida, los gráficos son impresionantes y la historia me mantuvo enganchado de principio a fin. Definitivamente uno de los mejores juegos que he jugado este año.`,
    },
    {
      author: "María González",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 4,
      content: `Me ha gustado mucho ${gameName}, aunque tiene algunos problemas menores de rendimiento. La historia es fascinante y los personajes están bien desarrollados. Recomendaría esperar a un parche antes de comprarlo si tienes un sistema de gama media.`,
    },
    {
      author: "Carlos Mendoza",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      content: `¡Compré ${gameName} el día del lanzamiento y no me arrepiento! La atención al detalle es impresionante y el mundo abierto es uno de los más inmersivos que he experimentado. Vale cada centavo.`,
    },
    {
      author: "Laura Sánchez",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 3,
      content: `${gameName} tiene potencial, pero me decepcionaron algunos aspectos. La historia principal es corta y algunas misiones secundarias son repetitivas. Los gráficos son buenos, pero esperaba más de este estudio.`,
    },
    {
      author: "Javier Martínez",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 4,
      content: `He disfrutado mucho de ${gameName}. El combate es satisfactorio y el sistema de progresión está bien equilibrado. Hay algunos bugs menores, pero nada que arruine la experiencia.`,
    },
  ]

  return reviewTemplates.map((template, index) => ({
    id: index + 1,
    author: template.author,
    avatar: template.avatar,
    rating: template.rating,
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    content: template.content,
  }))
}

// Generar precio ficticio basado en el ID del juego
const generatePrice = (id: number): { base: number; discount: number | null } => {
  // Usar el ID para generar un precio base entre 20 y 60
  const basePrice = 20 + (id % 40)

  // Aplicar descuento al 40% de los juegos
  const hasDiscount = id % 10 < 4
  const discountPercent = hasDiscount ? 10 + (id % 30) : null

  return {
    base: basePrice,
    discount: discountPercent,
  }
}

export default function ProductPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id") || "0"
  const name = searchParams.get("name") || "Game Title"
  const imageUrl = searchParams.get("image") || "/placeholder.svg?height=400&width=800"

  const { addItem } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const gameId = Number.parseInt(id)
  const [reviews] = useState<Review[]>(generateReviews(name))
  const [price] = useState(generatePrice(Number.parseInt(id)))
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    addItem({ id: Number.parseInt(id), name, image: imageUrl, price: discountedPrice ?? price.base, quantity })
    toast.success('Añadido al carrito')
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  // Calcular precio con descuento
  const discountedPrice = price.discount ? price.base - price.base * (price.discount / 100) : null

  return (
    <div className="bg-gradient-to-br from-zinc-950 to-black min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-zinc-500 mb-6">
          <Link href="/games" className="hover:text-zinc-300 transition-colors">
            Juegos
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/game/${id}`} className="hover:text-zinc-300 transition-colors">
            {name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-300">Comprar</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Imagen y detalles - izquierda */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-6">
              <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" priority />
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">{name}</h1>

            {/* Descripción del producto */}
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-medium text-zinc-100 mb-4">Descripción del producto</h2>
              <p className="text-zinc-300 mb-4">
                Sumérgete en una aventura épica con {name}, un juego que redefine los límites de su género. Explora
                vastos mundos abiertos llenos de misiones, secretos y personajes memorables.
              </p>
              <p className="text-zinc-300 mb-4">
                Con gráficos de última generación y una banda sonora inmersiva, {name} te ofrece una experiencia de
                juego sin igual. Enfréntate a desafíos únicos, mejora tus habilidades y descubre una historia que te
                mantendrá al borde de tu asiento.
              </p>
              <p className="text-zinc-300">
                Ya sea que prefieras jugar solo o con amigos, {name} ofrece múltiples modos de juego para satisfacer a
                todo tipo de jugadores. ¡No esperes más para unirte a millones de jugadores en esta aventura
                inolvidable!
              </p>
            </div>

            {/* Opiniones */}
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-zinc-100">Opiniones de usuarios</h2>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-amber-400 mr-1">star</span>
                  <span className="text-white font-medium">
                    {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)}
                  </span>
                  <span className="text-zinc-400 ml-1">({reviews.length})</span>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-zinc-800/50 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                        <Image
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-zinc-200 font-medium">{review.author}</h3>
                          <span className="text-zinc-500 text-sm">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`material-symbols-outlined text-sm ${
                                i < review.rating ? "text-amber-400" : "text-zinc-700"
                              }`}
                            >
                              star
                            </span>
                          ))}
                        </div>
                        <p className="text-zinc-300 text-sm">{review.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Información de compra - derecha */}
          <div>
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-medium text-zinc-100 mb-4">Comprar {name}</h2>

              {/* Precio */}
              <div className="mb-6">
                {price.discount ? (
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-zinc-400 line-through text-lg">${price.base.toFixed(2)}</span>
                    <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-sm">
                      -{price.discount}%
                    </span>
                  </div>
                ) : null}
                <div className="text-3xl font-bold text-white">${(discountedPrice || price.base).toFixed(2)}</div>
                <div className="text-zinc-500 text-sm mt-1">Impuestos incluidos</div>
              </div>

              {/* Selector de cantidad */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-zinc-300 mb-2">
                  Cantidad
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 w-10 h-10 flex items-center justify-center rounded-l-md transition-colors"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-16 h-10 bg-zinc-800 border-x border-zinc-700 text-center text-zinc-300 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 w-10 h-10 flex items-center justify-center rounded-r-md transition-colors"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined mr-2">shopping_cart</span>
                  {addedToCart ? "¡Añadido!" : "Añadir al carrito"}
                </button>
                <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium py-3 rounded-md flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined mr-2">bolt</span>
                  Comprar ahora
                </button>
                <button
                  onClick={() => {
                    toggleFavorite({ id: gameId, name, image: imageUrl });
                    toast(isFavorite(gameId) ? 'Eliminado de favoritos' : 'Añadido a favoritos');
                  }}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium py-3 rounded-md flex items-center justify-center transition-colors"
                >
                  <span
                    className="material-symbols-outlined mr-2"
                    style={{ color: isFavorite(gameId) ? 'crimson' : 'inherit' }}
                  >
                    favorite
                  </span>
                  {isFavorite(gameId) ? 'Quitar favorito' : 'Añadir a favoritos'}
                </button>
              </div>

              {/* Información adicional */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center text-zinc-400">
                  <span className="material-symbols-outlined mr-2 text-zinc-500">local_shipping</span>
                  Envío digital inmediato
                </div>
                <div className="flex items-center text-zinc-400">
                  <span className="material-symbols-outlined mr-2 text-zinc-500">verified</span>
                  Garantía de 30 días
                </div>
                <div className="flex items-center text-zinc-400">
                  <span className="material-symbols-outlined mr-2 text-zinc-500">support_agent</span>
                  Soporte 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
