// src/components/AuthForm.jsx

import React, { useState } from 'react';

const AuthForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setMessage('');

    const url = `https://securitas-app.onrender.com/api/auth/login`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Identifiants incorrects.');
      }

      localStorage.setItem('token', data.token);
      onLoginSuccess();
    } catch (error) {
      setMessage(error.message);
    }
  };

  // ➡️ Fonction pour le formulaire d'inscription
  const registerHandler = async (event) => {
    event.preventDefault();
    setMessage('');

    const username = prompt('Entrez votre nom d\'utilisateur :');
    if (!username) return setMessage('Nom dutilisateur requis.');

    const url = `https://securitas-app.onrender.com/api/auth/register`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l’inscription.');
      }

      localStorage.setItem('token', data.token);
      setShowRegister(false);
      onLoginSuccess();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Adresse Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Se connecter</button>
        </div>
      </form>

      <button onClick={() => setShowRegister(!showRegister)}>
        {showRegister ? 'Annuler' : 'S\'inscrire'}
      </button>

      {showRegister && (
        <form onSubmit={registerHandler} style={{ marginTop: '1rem' }}>
          <div>
            <label htmlFor="regEmail">Email</label>
            <input
              type="email"
              id="regEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="regPassword">Mot de passe</label>
            <input
              type="password"
              id="regPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Créer un compte</button>
        </form>
      )}

      {message && <p className="message error">{message}</p>}
    </div>
  );
};

export default AuthForm;
