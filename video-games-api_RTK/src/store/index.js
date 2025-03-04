import { configureStore } from "@reduxjs/toolkit"//configureStore de Redux Toolkit
import gamesReducer from "./gameSlice"
// import eventsReducer from "./eventsSlice"



export const store = configureStore({
  reducer: {
    games: gamesReducer
    // events: eventsReducer,
  },
})

