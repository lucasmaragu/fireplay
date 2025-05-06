'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerWithEmail } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';

export default function Register() {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (user) router.replace('/');
    }, [user, router]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await registerWithEmail(email, password);
            router.push('/'); // redirect after successful registration
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-[92%] bg-black">
            <h1 className="text-4xl font-bold mb-6 text-white">Register</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border-gray-300 text-black py-2 px-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full border-gray-300 text-black py-2 px-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full border-gray-300 text-black py-2 px-2 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-black text-white py-2 rounded cursor-pointer hover:bg-gray-900">Register</button>
            </form>
            <p className="mt-4 text-sm text-gray-300">Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a></p>
        </div>
    );
}
