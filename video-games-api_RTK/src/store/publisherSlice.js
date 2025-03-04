import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; //importo las funciones de redux  toolkit para crear slices y manejar asincronía
import * as api from '../services/gameService'; //importo todas las funciones que gestionan las lecturas a la API

//!defino un slice de Redux utilizando Redux Toolkit para manejar el estado relacionado con los publishers (editores) en tu aplicación

//declaro y exporto métodos para lecturas a las APIs con thunks
export const fetchPublisherDetails = createAsyncThunk(
  'publishers/fetchPublisherDetails',
  async (id) => {
    const response = await api.fetchPublisherDetails(id);
    return response;
  }
);

export const fetchPublisherGames = createAsyncThunk(
  'publishers/fetchPublisherGames',
  async ({ id, page }) => {
    const response = await api.fetchPublisherGames(id, page);
    return response;
  }
);

export const searchPublishers = createAsyncThunk(
  'publishers/searchPublishers',
  async ({ query, page }) => {
    const response = await api.searchPublishers(query, page);
    return response;
  }
);

//defino el slice con createSlice -> define el nombre slice, el estado inicial, los reducres y los extraReducers

const publishersSlice = createSlice({
  //nombre del slice
  name: 'publishers',
  //estado inicial a modo de objeto
  initialState: {
    
    publisherDetails: null,
    publisherGames: [],
    searchResults: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublisherDetails.fulfilled, (state, action) => {
        state.publisherDetails = action.payload;
      })
      .addCase(fetchPublisherGames.fulfilled, (state, action) => {
        state.publisherGames = action.payload.results;
      })
      .addCase(searchPublishers.fulfilled, (state, action) => {
        state.searchResults = action.payload.results;
      });
  },
});

export default publishersSlice.reducer;