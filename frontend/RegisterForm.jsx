import React, { useState } from 'react';

const RegisterForm = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch("https://securitas-app.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erreur lors de l'inscription");

      // Stocke le token
      localStorage.setItem("token", data.token);

      onRegisterSuccess();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p className="message error">{message}</p>}
    </div>
  );
};

export default RegisterForm;
