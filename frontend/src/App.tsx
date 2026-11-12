import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Login } from './components/Login';

export function App() {
  const [apiStatus, setApiStatus] = useState('Verificando conexión...');
  const [currentView, setCurrentView] = useState<'home' | 'login'>('home');
  
  // Estado para guardar la información del usuario autenticado desde MariaDB
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/health')
      .then(res => res.json())
      .then(data => setApiStatus(data.message))
      .catch(() => setApiStatus('Error: No se pudo conectar con el servidor backend'));
  }, []);

  // Recibe directamente el usuario real devuelto por la base de datos
  const handleLogin = (loggedUser: any) => {
    setUser(loggedUser);
    setCurrentView('home'); // Redirige a la página principal mostrando sus datos
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Si la vista es 'login' y no ha iniciado sesión, mostramos el componente de Login
  if (currentView === 'login' && !user) {
    return <Login onBack={() => setCurrentView('home')} onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      {/* Navbar con el nombre y avatar reales del cliente */}
      <Navbar 
        user={user} 
        onNavigateLogin={() => setCurrentView('login')} 
        onLogout={handleLogout} 
      />

      {/* Página Principal */}
      <main>
        <Hero onNavigateLogin={() => setCurrentView('login')} />
        <Features />
      </main>
    </div>
  );
}

export default App;