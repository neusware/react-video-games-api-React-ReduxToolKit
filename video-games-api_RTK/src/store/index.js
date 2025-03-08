import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gameSlice';
import publishersReducer from './publisherSlice';
import favoritesReducer from './favoritesSlice'; 
import eventsReducer from './eventSlice'
export const store = configureStore({
  reducer: {
    games: gamesReducer,
    publishers: publishersReducer,
    favorites: favoritesReducer,
    events: eventsReducer
  },
});