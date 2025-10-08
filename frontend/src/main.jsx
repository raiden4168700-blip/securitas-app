// src/main.jsx (Version corrigée et recommandée)

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- Importation des composants ---
import App from './App.jsx';
import AuthPage from './pages/AuthPage.jsx';
import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Route pour la page d'authentification */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Toutes les autres routes sont gérées par le composant App */}
        {/* C'est ici que vous protégerez vos routes privées */}
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
