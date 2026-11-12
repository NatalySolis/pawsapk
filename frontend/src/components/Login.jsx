import React, { useState } from 'react';
import { PawPrint, ArrowLeft, Mail, Lock, User } from 'lucide-react';

export function Login({ onBack, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nombre })
      });

      const data = await response.json();

      if (data.success) {
        onLogin(data.user); // data.user contendrá su rol ('CLIENTE', 'EMPLEADO', etc.)
      } else {
        alert(data.message || 'No se pudo iniciar sesión.');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('No se pudo conectar con el servidor backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 relative">
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 text-slate-400 hover:text-slate-700 transition flex items-center gap-1 text-sm font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>

        <div className="text-center mt-6 mb-8">
          <div className="w-12 h-12 bg-rose-50 text-[#FF6B4A] rounded-2xl mx-auto flex items-center justify-center mb-3">
            <PawPrint className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Bienvenido a PawsApp</h2>
          <p className="text-sm text-slate-500 mt-1">Ingresa o regístrate para gestionar tus citas</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre completo</label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input 
                type="text" 
                required
                placeholder="Tu Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B4A] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Correo electrónico</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input 
                type="email" 
                required
                placeholder="tucorreo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B4A] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B4A] transition"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6B4A] hover:bg-[#e05a3b] text-white py-3.5 rounded-xl font-bold shadow-md transition mt-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Procesando...' : 'Iniciar Sesión / Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
}