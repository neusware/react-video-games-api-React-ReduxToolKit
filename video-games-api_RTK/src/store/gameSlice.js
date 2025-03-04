import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as gameService from "../services/gameService"

export const fetchPopularGames = createAsyncThunk("games/fetchPopularGames", async () => {
  const response = await gameService.fetchPopularGames()
  return response.results
})

export const searchGames = createAsyncThunk("games/searchGames", async ({ query, page }) => {
  const response = await gameService.searchGames(query, page)
  return response
})

export const fetchGameDetails = createAsyncThunk("games/fetchGameDetails", async (id) => {
  const response = await gameService.fetchGameDetails(id)
  return response
})

export const fetchGamesByCategory = createAsyncThunk("games/fetchGamesByCategory", async ({ type, id, page }) => {
  const response = await gameService.fetchGamesByCategory(type, id, page)
  return response
})

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    popularGames: [],
    searchResults: [],
    gameDetails: null,
    categoryGames: [],
    status: "idle",
    error: null,
    totalPages: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularGames.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPopularGames.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.popularGames = action.payload
      })
      .addCase(fetchPopularGames.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(searchGames.fulfilled, (state, action) => {
        state.searchResults = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 20)
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.gameDetails = action.payload
      })
      .addCase(fetchGamesByCategory.fulfilled, (state, action) => {
        state.categoryGames = action.payload.results
        state.totalPages = Math.ceil(action.payload.count / 20)
      })
  },
})

export default gamesSlice.reducer

