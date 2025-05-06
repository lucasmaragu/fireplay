"use client"

import { SearchBar } from "./Searchbar"
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useAuth } from '@/context/AuthContext'
import LogoutButton from './Logoutbutton'

export default function Header() {
  const { cartItems } = useCart()
  const { favorites } = useFavorites()
  const { user } = useAuth()
  return (
    <header className="sticky top-0 z-50 py-4 px-6 bg-black/80 backdrop-blur-md text-white w-full  flex justify-between items-center border-b border-zinc-800/50">
      <Link href="/games" className="flex-shrink-0">
        <h1 className="font-bold text-xl tracking-wider">
          <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">FIRE</span>
          <span className="text-red-500">PLAY</span>
        </h1>
      </Link>

      {/* Cart and Favorites icons */}
      <div className="flex items-center gap-3">
        <Link href="/cart" className="relative p-2 flex rounded-full hover:bg-zinc-800/50 transition-colors">
          <span className="material-symbols-outlined text-zinc-400 hover:text-zinc-100 transition-colors">shopping_cart</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartItems.length}</span>
          )}
        </Link>
        <Link href="/favorites" className="relative p-2 flex rounded-full hover:bg-zinc-800/50 transition-colors">
          <span className="material-symbols-outlined text-zinc-400 hover:text-zinc-100 transition-colors">favorite</span>
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{favorites.length}</span>
          )}
        </Link>

        {/* Perfil: icono que redirige a /profile */}
        <Link href="/profile" className="p-2 flex rounded-full hover:bg-zinc-800/50 transition-colors">
          <span className="material-symbols-outlined text-zinc-400 hover:text-zinc-100 transition-colors">person</span>
        </Link>
        
        

        
        {/* Show logout if user is logged in, otherwise login icon */}
        {user ? (
          <LogoutButton />
        ) : (
          <>
    <Link href="/login" className="p-2 flex rounded-full hover:bg-zinc-800/50 transition-colors">
      Login
    </Link>
    <Link href="/register" className="p-2 flex rounded-full hover:bg-zinc-800/50 transition-colors">
      Register
    </Link>
  </>
        )}
      </div>
    </header>
  )
}
