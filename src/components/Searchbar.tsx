"use client"

import type React from "react"

import { useState } from "react"


export const SearchBar = ({ onSearchChange }: { onSearchChange: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearchChange(query)
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for games..."
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full py-3 px-4 bg-zinc-800/50 border border-zinc-700/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500/30 focus:border-zinc-700/50 text-zinc-300 placeholder:text-zinc-600 pl-12"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <span className="material-symbols-outlined">
search
</span>      </div>
    </div>
  )
}
