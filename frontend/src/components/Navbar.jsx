import React from 'react';
import { Phone, User, Calendar } from 'lucide-react';

export function Navbar({ user, onNavigateLogin, onLogout }) {
  return (
    <>

      {/* Navbar Principal */}
      <header className="bg-white border-b border-slate-100 py-3.5 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl shadow-md overflow-hidden flex items-center justify-center bg-white border border-slate-100">
            <img src="/logo.png" alt="Logo PawsApp" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-none">PawsApp</span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Clínica Veterinaria Integral</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#home" className="text-[#FF6B4A] font-bold">Home</a>
          <a href="#services" className="hover:text-[#FF6B4A] transition">Services</a>
          <a href="#about" className="hover:text-[#FF6B4A] transition">About</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Phone className="w-4 h-4 text-[#FF6B4A]" />
            <span>(555) 234-PAWS</span>
          </div>

          {/* Si el usuario ha iniciado sesión, mostramos su foto y nombre. Si no, mostramos los botones de acceso */}
          {user ? (
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-2xl shadow-sm">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-9 h-9 rounded-full object-cover border-2 border-[#FF6B4A]" 
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-extrabold text-slate-900 leading-none">{user.name}</p>
                <button 
                  onClick={onLogout}
                  className="text-[10px] text-rose-500 font-bold hover:underline mt-0.5 block"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          ) : (
            <>
              <button 
                onClick={onNavigateLogin}
                className="bg-[#FF6B4A] hover:bg-[#e05a3b] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition flex items-center gap-2 cursor-pointer"
              >
                Agendar Cita
              </button>

              <button 
                onClick={onNavigateLogin}
                className="bg-[#FF6B4A] text-white p-2.5 rounded-full hover:opacity-90 transition shadow-sm cursor-pointer"
                title="Acceso de usuarios"
              >
                <User className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </header>
    </>
  );
}