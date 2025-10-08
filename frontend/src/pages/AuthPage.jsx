// src/pages/AuthPage.jsx (Version Corrigée)

import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. IMPORTER useNavigate
import AuthForm from '../components/AuthForm.jsx';
import './AuthPage.css'; 

const AuthPage = () => { // 2. onLoginSuccess n'est plus nécessaire ici
  const navigate = useNavigate(); // 3. INITIALISER le hook

  // 4. CRÉER la fonction qui sera exécutée après une connexion réussie
  const handleLoginSuccess = () => {
    // Redirige l'utilisateur vers la page principale (le tableau de bord)
    navigate('/'); 
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="logos-container">
          <img src="https://www.hellocustomer.com/hs-fs/hubfs/Securitas%20logo.png?width=435&height=280&name=Securitas%20logo.png" alt="Logo Securitas" className="logo" />
          <img src="https://www.lat-nitrogen.com/images/frontend/borealis-logo-for-mobile.png" alt="Logo LAT Nitrogen" className="logo" />
        </div>
        <h1>SECURITAS</h1>
        <p>LAT NITROGEN</p>
        
        {/* 5. PASSER notre nouvelle fonction à AuthForm */}
        <AuthForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
   );
};

export default AuthPage;

