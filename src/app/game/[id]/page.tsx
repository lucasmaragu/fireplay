"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

type GameDetails = {
  id: number
  name: string
  description_raw: string
  background_image: string
  background_image_additional?: string
  released: string
  rating: number
  ratings_count: number
  platforms: Array<{ platform: { name: string; id: number } }>
  genres: Array<{ name: string; id: number }>
  tags: Array<{ name: string; id: number }>
  developers: Array<{ name: string; id: number }>
  publishers: Array<{ name: string; id: number }>
  screenshots: Array<{ id: number; image: string }>
  minimum_requirements?: string
  recommended_requirements?: string
}

export default function GameDetailsPage({ params }: { params: { id: string } }) {
  const [game, setGame] = useState<GameDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null)

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        // Fetch game details
        const response = await fetch(
          `https://api.rawg.io/api/games/${params.id}?key=4d7badacf7db4e91b61828704669a4c0`
        )
        const gameData = await response.json()

        // Fetch screenshots
        const screenshotsResponse = await fetch(
          `https://api.rawg.io/api/games/${params.id}/screenshots?key=4d7badacf7db4e91b61828704669a4c0`
        )
        const screenshotsData = await screenshotsResponse.json()

        // Combine data
        setGame({
          ...gameData,
          screenshots: screenshotsData.results || [],
        })

        // Set first screenshot as active
        if (screenshotsData.results && screenshotsData.results.length > 0) {
          setActiveScreenshot(screenshotsData.results[0].image)
        }
      } catch (error) {
        console.error("Error fetching game details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGameDetails()
  }, [params.id])

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-zinc-950 to-black min-h-screen p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="w-full h-[400px] bg-zinc-900/40 animate-pulse rounded-lg mb-8" />
          <div className="w-3/4 h-10 bg-zinc-900/40 animate-pulse rounded-lg mb-4" />
          <div className="w-full h-40 bg-zinc-900/40 animate-pulse rounded-lg" />
        </div>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="bg-gradient-to-br from-zinc-950 to-black min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-zinc-300 mb-4">Game not found</h1>
          <Link href="/games" className="text-red-500 hover:text-red-400">
            Back to games
          </Link>
        </div>
      </div>
    )
  }

  // Generate random system requirements if not available
  const systemRequirements = {
    minimum: game.minimum_requirements || 
      "OS: Windows 7 or newer\nProcessor: Intel Core i3-2100 / AMD FX-4350\nMemory: 4 GB RAM\nGraphics: NVIDIA GeForce GTX 660 / AMD Radeon R7 370\nStorage: 30 GB available space",
    recommended: game.recommended_requirements || 
      "OS: Windows 10\nProcessor: Intel Core i5-6600K / AMD Ryzen 5 1600\nMemory: 8 GB RAM\nGraphics: NVIDIA GeForce GTX 1060 / AMD Radeon RX 580\nStorage: 30 GB available space"
  }

  return (
    <div className="bg-gradient-to-br from-zinc-950 to-black min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero section with main image */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
          <Image
            src={game.background_image || "/placeholder.svg?height=400&width=1200"}
            alt={game.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{game.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center">
                <span className="material-symbols-outlined text-amber-400 mr-1">star</span>
                <span className="text-white">{game.rating.toFixed(1)}</span>
                <span className="text-zinc-400 ml-1">({game.ratings_count})</span>
              </div>
              <div className="text-zinc-400">
                Released: {new Date(game.released).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - left side */}
          <div className="lg:col-span-2">
            {/* Screenshots gallery */}
            <div className="mb-8">
              <h2 className="text-xl font-medium text-zinc-100 mb-4 border-l-4 border-red-500 pl-3">
                Screenshots
              </h2>
              <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-4">
                <Image
                  src={activeScreenshot || game.background_image || "/placeholder.svg?height=400&width=800"}
                  alt={`${game.name} screenshot`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {game.screenshots.map((screenshot) => (
                  <button
                    key={screenshot.id}
                    onClick={() => setActiveScreenshot(screenshot.image)}
                    className={`relative w-24 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeScreenshot === screenshot.image ? "border-red-500" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={screenshot.image || "/placeholder.svg"}
                      alt={`${game.name} thumbnail`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-medium text-zinc-100 mb-4 border-l-4 border-red-500 pl-3">
                About
              </h2>
              <div className="text-zinc-300 leading-relaxed space-y-4">
                {game.description_raw.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* System Requirements */}
            <div className="mb-8">
              <h2 className="text-xl font-medium text-zinc-100 mb-4 border-l-4 border-red-500 pl-3">
                System Requirements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4">
                  <h3 className="text-zinc-100 font-medium mb-2">Minimum</h3>
                  <div className="text-zinc-400 text-sm whitespace-pre-line">{systemRequirements.minimum}</div>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4">
                  <h3 className="text-zinc-100 font-medium mb-2">Recommended</h3>
                  <div className="text-zinc-400 text-sm whitespace-pre-line">{systemRequirements.recommended}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - right side */}
          <div>
            {/* Action buttons */}
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4 mb-6">
              <Link
                href={`/product-sheety?id=${game.id}&name=${encodeURIComponent(game.name)}&image=${encodeURIComponent(
                  game.background_image
                )}`}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md flex items-center justify-center transition-colors mb-3"
              >
                <span className="material-symbols-outlined mr-2">shopping_cart</span>
                View Store Page
              </Link>
              <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium py-3 rounded-md flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined mr-2">favorite</span>
                Add to Wishlist
              </button>
            </div>

            {/* Game info */}
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4 mb-6">
              <h3 className="text-zinc-100 font-medium mb-3">Game Info</h3>
              
              <div className="space-y-3 text-sm">
                {/* Developers */}
                <div>
                  <div className="text-zinc-500 mb-1">Developers</div>
                  <div className="text-zinc-300">
                    {game.developers?.map((dev) => dev.name).join(", ") || "Unknown"}
                  </div>
                </div>
                
                {/* Publishers */}
                <div>
                  <div className="text-zinc-500 mb-1">Publishers</div>
                  <div className="text-zinc-300">
                    {game.publishers?.map((pub) => pub.name).join(", ") || "Unknown"}
                  </div>
                </div>
                
                {/* Release date */}
                <div>
                  <div className="text-zinc-500 mb-1">Release Date</div>
                  <div className="text-zinc-300">{new Date(game.released).toLocaleDateString()}</div>
                </div>
                
                {/* Platforms */}
                <div>
                  <div className="text-zinc-500 mb-1">Platforms</div>
                  <div className="text-zinc-300">
                    {game.platforms?.map((p) => p.platform.name).join(", ") || "Unknown"}
                  </div>
                </div>
              </div>
            </div>

            {/* Genres & Tags */}
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4">
              <h3 className="text-zinc-100 font-medium mb-3">Genres & Tags</h3>
              
              {/* Genres */}
              <div className="mb-4">
                <div className="text-zinc-500 mb-2 text-sm">Genres</div>
                <div className="flex flex-wrap gap-2">
                  {game.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-xs"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <div className="text-zinc-500 mb-2 text-sm">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {game.tags.slice(0, 10).map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-zinc-800/50 text-zinc-400 px-2 py-1 rounded-md text-xs"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
