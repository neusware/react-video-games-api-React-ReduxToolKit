import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gameSlice';
import publishersReducer from './publisherSlice';
import favoritesReducer from './favoritesSlice'; // Importa el reducer de favoritos

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    publishers: publishersReducer,
    favorites: favoritesReducer, // Añade el reducer de favoritos aquí
  },
});