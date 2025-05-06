'use client';

import { useAuth } from '@/context/AuthContext'; // o tu ruta real
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login'); // redirige al login después del logout
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <button onClick={handleLogout} className='p-2 flex rounded-full hover:bg-zinc-800/50 transition-colors cursor-pointer' >
      <span className="material-symbols-outlined text-red-500 hover:text-red-400 transition-colors">
logout
</span>
    </button>
  );
}
