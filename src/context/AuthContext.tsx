'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onUserChange } from '@/lib/auth';

const AuthContext = createContext<{ user: User | null }>({ user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const unsuscribe = onUserChange(setUser);
        return () => unsuscribe();
    }, [])
    
    if (!mounted) return null

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

