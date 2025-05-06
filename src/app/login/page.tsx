'use client'

import { useState, useEffect } from 'react';
import { login } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (user) router.replace('/')
    }, [user, router])

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            await login(email, password);
            router.push('/');
            
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };
    

    return (
        <div className="flex flex-col items-center justify-center h-[92%] bg-black">
            <h1 className="text-4xl font-bold mb-6">Login</h1>
            <form className="bg-white p-8 rounded shadow-md w-96">
                <div className="mb-4 ">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="mt-1 block w-full border border-gray-300 py-2 px-2 rounded-md shadow-sm text-black focus:border-blue-500 focus:ring-blue-500" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="mt-1 block w-full border-gray-300 border text-black py-2 px-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
                </div>
                <div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                </div>
                <button  onClick={handleLogin} type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 cursor-pointer">Login</button>
            </form>
            <p className="mt-4 text-sm text-gray-600">Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a></p>
        </div>
    );
}