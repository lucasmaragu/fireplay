"use client"

import { useState, useRef, useEffect } from "react"

export type SortOption = {
  label: string
  value: string
}

export type FilterOptions = {
  sort: string
}

type GameFiltersProps = {
  onFilterChange: (filters: FilterOptions) => void
}

const sortOptions: SortOption[] = [
  { label: "Relevancia", value: "relevance" },
  { label: "Fecha (más reciente)", value: "released:desc" },
  { label: "Fecha (más antigua)", value: "released:asc" },
  { label: "Nombre (A-Z)", value: "name:asc" },
  { label: "Nombre (Z-A)", value: "name:desc" },
  { label: "Rating (mayor)", value: "rating:desc" },
  { label: "Rating (menor)", value: "rating:asc" },
]

export function GameFilters({ onFilterChange }: GameFiltersProps) {
  const [activeSort, setActiveSort] = useState<SortOption>(sortOptions[0])
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSortChange = (option: SortOption) => {
    setActiveSort(option)
    setIsDropdownOpen(false)
    onFilterChange({
      sort: option.value,
    })
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-6 w-full">
      

      <div className="flex items-center  gap-2 relative" ref={dropdownRef}>
        <span className="text-zinc-500 text-sm">Ordenar por:</span>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-zinc-800/50 hover:bg-zinc-800 rounded-md text-zinc-300 text-sm transition-colors"
        >
          {activeSort.label}
          <span className="material-symbols-outlined text-sm">
            {isDropdownOpen ? "expand_less" : "expand_more"}
          </span>
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-1 w-48 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg z-50">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option)}
                className={`w-full text-left px-3 py-2 text-sm cursor-pointer hover:bg-zinc-800 transition-colors ${
                  activeSort.value === option.value ? "text-red-500" : "text-zinc-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
