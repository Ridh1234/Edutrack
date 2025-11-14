"use client";
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="container flex items-center justify-between py-4">
      <Link href={user ? "/dashboard" : "/"} className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all">
        EduTrack
      </Link>
      <div className="flex items-center gap-4 text-sm font-medium">
        {!user && (
          <>
            <Link 
              href="/register" 
              className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-white/50"
            >
              Register
            </Link>
            <Link 
              href="/login" 
              className="btn-primary"
            >
              Login
            </Link>
          </>
        )}
        {user && (
          <>
            <div className="badge badge-primary">
              {user.name} · {user.role}
            </div>
            <Link 
              href="/dashboard" 
              className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-white/50"
            >
              Dashboard
            </Link>
            {user.role === 'student' && (
              <Link 
                href="/grades" 
                className="text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-white/50"
              >
                Grades
              </Link>
            )}
            <button 
              onClick={logout} 
              className="btn-secondary"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
