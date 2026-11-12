import React from 'react';
import { Heart, Building2, TestTube, Pill } from 'lucide-react';

export function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3.5 shadow-sm">
          <div className="bg-rose-50 p-2.5 rounded-xl text-[#FF6B4A]">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Manejo Fear-Free</h4>
            <p className="text-xs text-slate-500">Sin estrés ni sujeciones forzadas</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3.5 shadow-sm">
          <div className="bg-sky-50 p-2.5 rounded-xl text-sky-600">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Salas Separadas</h4>
            <p className="text-xs text-slate-500">Exclusivas para perros y gatos</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3.5 shadow-sm">
          <div className="bg-emerald-50 p-2.5 rounded-xl text-[#059669]">
            <TestTube className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Laboratorio 24/7</h4>
            <p className="text-xs text-slate-500">Diagnóstico clínico inmediato</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3.5 shadow-sm">
          <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Farmacia Interna</h4>
            <p className="text-xs text-slate-500">Medicamentos de dosis exacta</p>
          </div>
        </div>
      </div>
    </section>
  );
}