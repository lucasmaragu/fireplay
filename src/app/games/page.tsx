"use client"

import { useState, useEffect } from "react"
import GameCard from "@/components/Gamecard"
import { GameFilters, type FilterOptions } from "@/components/Gamefilters"
import { Pagination } from "@/components/Pagination"
import { SearchBar } from "@/components/Searchbar"
import { motion } from "framer-motion"

type Game = {
  id: number
  name: string
  background_image: string
  released: string
  rating?: number
}

type ApiResponse = {
  results: Game[]
  count: number
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<FilterOptions>({
    sort: "relevance",
  })
  const [searchQuery, setSearchQuery] = useState("")

  const fetchGames = async () => {
    setLoading(true)
    try {
      let ordering = ""
      if (filters.sort !== "relevance") {
        const [field, direction] = filters.sort.split(":")
        ordering = direction === "desc" ? `-${field}` : field
      }

      const params = new URLSearchParams({
        key: "4d7badacf7db4e91b61828704669a4c0",
        page: currentPage.toString(),
        page_size: "12",
      })

      if (ordering) {
        params.append("ordering", ordering)
      }

      if (searchQuery) {
        params.append("search", searchQuery)
      }

      const response = await fetch(`https://api.rawg.io/api/games?${params.toString()}`)
      const data: ApiResponse = await response.json()

      setGames(data.results)
      setTotalPages(Math.ceil(data.count / 12))
    } catch (error) {
      console.error("Error fetching games:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [currentPage, filters, searchQuery])

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  return (
    <div className="bg-gradient-to-br from-zinc-950 to-black min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-zinc-100 text-2xl font-medium mb-8 border-l-4 border-red-500 pl-3">Featured Games</h1>

         <section className="relative pt-12 pb-16 mb-8 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <span className="material-symbols-outlined">
sports_esports
</span>
                  </div>
                  <h1 className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                      Explore
                    </span>
                    <span className="text-red-500"> Games</span>
                  </h1>
                </div>
                <p className="text-zinc-400 max-w-xl">
                  Discover thousands of games across all platforms. Filter, search, and find your next gaming adventure.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-zinc-900/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-800/50">
              <span className="material-symbols-outlined">
local_fire_department
</span>
                <span className="text-zinc-300 font-medium">
                  {totalPages > 0 ? `${totalPages * 12}+ Games Available` : "Loading games..."}
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col md:flex-row gap-4 mb-8 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/30 p-4 rounded-xl"
            >
              <div className="w-full">
                <SearchBar onSearchChange={handleSearchChange} />
              </div>
              <GameFilters onFilterChange={handleFilterChange} />
            </motion.div>
          </motion.div>
        </div>
      </section>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="relative aspect-[3/4] w-full bg-zinc-900/40 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </div>
    </div>
  )
}
