
//slices -> (parte del estado global) de Redux utilizando Redux Toolkit para manejar el estado relacionado con los publishers (editores). Se define el estado inicial, reducers y los extraReducers que manejan las acciones async
//si solicitud fetchPublisherDetails completada correctamente "fulfilled" | state->estado a tratar | action->objeto action dispached, saco el payload que contiene los datos devuelto

//thunks-> se utilizan para gestionar las solicitudes async a la API. En este caso reciben 1. nombre de la accion, 2.arrow function async (param){solicitud async, retorno}

//reducers->funciones async que reciben el estado actual y una accion para devolver un nuevo estado de forma síncrona (propio slice), idem pero de forma async para los extraReducers, es decir, gestionan el estado a parti de operaciones generadas con de forma async (como una llamada api) (en RTK se definen en el createSlice())


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; //importo las funciones de redux  toolkit para crear slices y manejar asincronía
import * as api from '../services/gameService'; //importo todas las funciones que gestionan las lecturas a la API


//---------------Métodos para lecturas a las APIs con thunks

//declro y exporto método para lectura de publisher por id, por parámetro (...)
export const fetchPublisherDetails = createAsyncThunk(
  'publishers/fetchPublisherDetails', //p1->nombre de la acción
  //p2->función async (id)
  async (id) => {
    //lanzo solicitud con el parámetro, sacando el método de api.metodo(parametro)
    const response = await api.fetchPublisherDetails(id);
    //retorno la response
    return response;
  }
);

//declaro y exporto metodo para obtener los juego de un editor
export const fetchPublisherGames = createAsyncThunk(
  'publishers/fetchPublisherGames',
  async ({ id, page }) => {
    const response = await api.fetchPublisherGames(id, page);
    return response;
  }
);

//accion asíncrona para buscar publisher (input)
export const searchPublishers = createAsyncThunk(
  'publishers/searchPublishers',
  async ({ query, page }) => {
    const response = await api.searchPublishers(query, page);
    return response;
  }
);

//defino el slice con createSlice -> declarando el nombre slice, el estado inicial, los reducres y los extraReducers

const publishersSlice = createSlice({
  //nombre del slice
  name: 'publishers',
  //estado inicial (como object)
  initialState: {
    //detalles del publisher actual
    publisherDetails: null,
    //juegos del publisher
    publisherGames: [],
    //resultado de la busqueda de publsher
    searchResults: [],
    //estado de la solicitud(idle, loading, succeded, failed)
    status: 'idle',
    //mensaje de error en caso de fallo en solicitud
    error: null,
  },
  //no reducers
  reducers: {},
  extraReducers: (builder) => {
    builder

    
    //!asyncmethod.fullfiled||pending||rejected
    .addCase(fetchPublisherDetails.fulfilled, (state, action) => {
      state.publisherDetails = action.payload;// actualizo el estado publisherDetails con los datos obtenidos de la API
    })
    .addCase(fetchPublisherGames.fulfilled, (state, action) => {
      state.publisherGames = action.payload.results; // Actualiza publisherGames con los datos obtenidos de la API
    })
    .addCase(searchPublishers.fulfilled, (state, action) => {
      state.searchResults = action.payload.results;  // Actualiza searchResults con los datos obtenidos de la API
    });
  },
});

//exporto el reducer del slice
export default publishersSlice.reducer;
