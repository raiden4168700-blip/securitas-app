import React from 'react';

const HomePage = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <h1>Securitas</h1>
      <p>Vous êtes connecté avec succès !</p>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
};

export default HomePage;
