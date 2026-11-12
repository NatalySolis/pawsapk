import React from 'react';
import { Calendar, Play } from 'lucide-react';

export function Hero({ onNavigateLogin }) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 flex flex-col items-start">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.15] mb-6">
          Cuidado amoroso, profesional <br />
          y <span className="text-[#FF6B4A]">sin estrés</span> para tus <br />
          compañeros de vida.
        </h1>

        <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
          Consultas, prevención, cirugía y urgencias 24/7 en un espacio diseñado para la serenidad de tu perro y gato. Reserva en menos de 2 minutos sin contraseñas ni registros previos.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={onNavigateLogin}
            className="bg-[#FF6B4A] hover:bg-[#e05a3b] text-white px-7 py-3.5 rounded-2xl font-bold text-base shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-5 h-5" /> Agendar Cita Ahora
          </button>
          <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3.5 rounded-2xl font-bold text-base hover:bg-slate-50 transition flex items-center gap-2">
            <Play className="w-4 h-4 fill-slate-700" /> Ver Servicios & Precios
          </button>
        </div>
      </div>

      <div className="lg:col-span-5 relative">
        <div className="bg-white p-3 rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800" 
            alt="Mascota PawsApp" 
            className="w-full h-[420px] object-cover rounded-2xl"
          />
        </div>
      </div>
    </main>
  );
}