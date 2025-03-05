import React from 'react';
import { useSelector } from 'react-redux';
import GameCard from '../components/GameCard';

const FavoritesPage = () => {
  const favorites = useSelector(state => state.favorites);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-red-600">Mis Favoritos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.length > 0 ? (
          favorites.map((game) => (
            <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
          ))
        ) : (
          <p className="text-center text-gray-600">No tienes juegos favoritos.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;