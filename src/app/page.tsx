"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import Footer from "@/components/Footer"
import { SearchBar } from "@/components/Searchbar"
import MiniGameCard from "@/components/MiniGameCard"

// Sample featured games data
const featuredGames = [
  {
    id: 1,
    name: "Cyberpunk 2077",
    background_image: "/placeholder.svg?height=600&width=400",
    released: "2020-12-10",
    rating: 4.1,
    genre: "RPG",
  },
  {
    id: 2,
    name: "Elden Ring",
    background_image: "/placeholder.svg?height=600&width=400",
    released: "2022-02-25",
    rating: 4.8,
    genre: "Action RPG",
  },
  {
    id: 3,
    name: "God of War Ragnarök",
    background_image: "/placeholder.svg?height=600&width=400",
    released: "2022-11-09",
    rating: 4.9,
    genre: "Action-Adventure",
  },
]

// Sample categories
const categories = [
  {
    name: "Action",
    icon: (
      <span className="material-symbols-outlined">
        bolt
      </span>
    ),
    count: 1240,
  },
  {
    name: "Adventure",
    icon: (
      <span className="material-symbols-outlined">
        sports_esports
      </span>
    ),
    count: 840,
  },
  {
    name: "RPG",
    icon: (
      <span className="material-symbols-outlined">
        trophy
      </span>
    ),
    count: 732,
  },
  {
    name: "Strategy",
    icon: (
      <span className="material-symbols-outlined">
        local_fire_department
      </span>
    ),
    count: 510,
  },
]

// Type for search results
interface SearchGame {
  id: number
  name: string
  background_image: string
  released: string
  rating?: number
}

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchGame[]>([])
  const [searchLoading, setSearchLoading] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    // Fetch search results when query changes
    if (!searchQuery) {
      setSearchResults([])
      return
    }
    const fetchResults = async () => {
      setSearchLoading(true)
      try {
        const params = new URLSearchParams({
          key: "4d7badacf7db4e91b61828704669a4c0",
          search: searchQuery,
          page_size: "6",
        })
        const res = await fetch(`https://api.rawg.io/api/games?${params}`)
        const data = await res.json()
        setSearchResults(data.results || [])
      } catch (e) {
        console.error("Search error", e)
        setSearchResults([])
      } finally {
        setSearchLoading(false)
      }
    }
    fetchResults()
  }, [searchQuery])

  const calculateParallax = (strength = 0.05) => {
    if (!heroRef.current) return { x: 0, y: 0 }

    const rect = heroRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = (mousePosition.x - centerX) * strength
    const y = (mousePosition.y - centerY) * strength

    return { x, y }
  }

  const parallax = calculateParallax()

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[90vh] overflow-hidden flex items-center justify-center"
      >
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.15), transparent 70%)",
            }}
          />

          {/* Animated grid */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-30" />

          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-red-500 opacity-70"
              initial={{
                x: Math.random() * 100 - 50 + "%",
                y: Math.random() * 100 - 50 + "%",
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                x: [
                  Math.random() * 100 - 50 + "%",
                  Math.random() * 100 - 50 + "%",
                  Math.random() * 100 - 50 + "%",
                ],
                y: [
                  Math.random() * 100 - 50 + "%",
                  Math.random() * 100 - 50 + "%",
                  Math.random() * 100 - 50 + "%",
                ],
                opacity: [
                  Math.random() * 0.5 + 0.2,
                  Math.random() * 0.5 + 0.5,
                  Math.random() * 0.5 + 0.2,
                ],
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

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                FIRE
              </span>
              <span className="text-red-500">PLAY</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
              Discover a new dimension of gaming. Your adventure begins here.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-xl "
          >
            <SearchBar onSearchChange={handleSearchChange} />
          </motion.div>

          {/* Search results */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="w-full max-w-xl mx-auto mb-8"
            >
              {searchLoading ? (
                <p className="text-zinc-400 text-center">Buscando...</p>
              ) : searchResults.length > 0 ? (
                <div className="grid ">
                  {searchResults.map((game) => (
                    <MiniGameCard key={game.id} game={game} />
                  ))}
                </div>
              ) : (
                <p className="text-zinc-400 text-center">
                  No se encontraron resultados
                </p>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row mt-12 gap-4"
          >
            <Link
              href="/games"
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg shadow-red-500/20 flex items-center justify-center"
            >
              Explore Games
              <span className="material-symbols-outlined">chevron_right</span>
            </Link>
            <Link
              href="/register"
              className="px-8 py-3 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg text-zinc-300 font-medium hover:bg-zinc-700/80 hover:text-white transition-all duration-300"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-8 h-12 border-2 border-zinc-500 rounded-full flex justify-center p-1">
            <motion.div
              className="w-1 h-3 bg-red-500 rounded-full"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
          <span className="text-zinc-500 text-sm mt-2">Scroll</span>
        </motion.div>
      </section>

      {/* Featured Games Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Featured
              </span>
              <span className="text-red-500"> Games</span>
            </h2>
            <Link
              href="/games"
              className="flex items-center text-zinc-400 hover:text-red-500 transition-colors"
            >
              View all
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-[400px] overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

                <Image
                  src={game.background_image || "/placeholder.svg"}
                  alt={game.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="px-3 py-1 bg-red-500/80 backdrop-blur-sm rounded-full text-xs font-medium">
                      {game.genre}
                    </span>
                    <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-amber-400">
                        star
                      </span>
                      <span className="text-xs font-medium text-zinc-200">
                        {game.rating}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {game.name}
                  </h3>

                  <div className="flex items-center text-zinc-400 text-sm mb-4">
                    <span className="material-symbols-outlined text-sm mr-1">
                      calendar_today
                    </span>
                    <span>
                      {new Date(game.released).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <Link
                    href={`/game/${game.id}`}
                    className="w-full py-3 bg-zinc-800/80 backdrop-blur-sm hover:bg-red-500 text-zinc-300 hover:text-white text-center font-medium rounded-lg transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 relative bg-zinc-900/30">
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.4), transparent 70%)",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Browse by
            </span>
            <span className="text-red-500"> Category</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/30 rounded-xl p-6 hover:border-red-500/30 hover:bg-zinc-800/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800/80 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                    <div className="text-zinc-400 group-hover:text-red-500 transition-colors">
                      {category.icon}
                    </div>
                  </div>
                  <span className="text-zinc-500 text-sm">
                    {category.count} games
                  </span>
                </div>

                <h3 className="text-xl font-medium text-zinc-300 group-hover:text-red-400 transition-colors">
                  {category.name}
                </h3>

                <Link
                  href={`/category/${category.name.toLowerCase()}`}
                  className="mt-4 inline-flex items-center text-sm text-zinc-500 group-hover:text-red-500 transition-colors"
                >
                  Browse games
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Community Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-black/40 z-10" />

            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-40" />

            <div className="relative z-20 py-16 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    Join the
                  </span>
                  <span className="text-red-500"> FIREPLAY</span>
                  <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                    {" "}
                    Community
                  </span>
                </h2>
                <p className="text-zinc-400 mb-6">
                  Connect with gamers worldwide, share your experiences, and
                  discover new adventures together. Join our community today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/signup"
                    className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg shadow-red-500/20 text-center"
                  >
                    Join Now
                  </Link>
                  <Link
                    href="/about"
                    className="px-8 py-3 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg text-zinc-300 font-medium hover:bg-zinc-700/80 hover:text-white transition-all duration-300 text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              <div className="relative w-full max-w-[300px] aspect-square">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Community"
                  fill
                  className="object-cover rounded-xl"
                />

                <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-500/30">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">10K+</div>
                    <div className="text-xs text-zinc-300">Players</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Stay in the
              </span>
              <span className="text-red-500"> Game</span>
            </h2>
            <p className="text-zinc-400 mb-8">
              Subscribe to our newsletter and be the first to know about new
              game releases, exclusive offers, and upcoming events.
            </p>

            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 py-3 px-4 bg-zinc-800/50 border border-zinc-700/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500/30 focus:border-zinc-700/50 text-zinc-300 placeholder:text-zinc-600"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-lg text-white font-medium hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg shadow-red-500/20"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs text-zinc-500 mt-4">
              By subscribing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
