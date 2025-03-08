import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchEvents } from "../services/events"

// Load user events from localStorage
const loadUserEvents = () => {
  try {
    const userEvents = localStorage.getItem("userEvents")
    return userEvents ? JSON.parse(userEvents) : []
  } catch (error) {
    console.error("Error loading user events from localStorage:", error)
    return []
  }
}

// Save user events to localStorage
const saveUserEvents = (userEvents) => {
  try {
    localStorage.setItem("userEvents", JSON.stringify(userEvents))
  } catch (error) {
    console.error("Error saving user events to localStorage:", error)
  }
}

// Async thunk to fetch events
export const fetchAllEvents = createAsyncThunk("events/fetchAllEvents", async () => {
  const events = await fetchEvents()
  return events
})

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    userEvents: loadUserEvents(),
    status: "idle",
    error: null,
  },
  reducers: {
    signUpForEvent: (state, action) => {
      const eventId = action.payload
      if (!state.userEvents.includes(eventId)) {
        state.userEvents.push(eventId)
        saveUserEvents(state.userEvents)
      }
    },
    cancelEventParticipation: (state, action) => {
      const eventId = action.payload
      state.userEvents = state.userEvents.filter((id) => id !== eventId)
      saveUserEvents(state.userEvents)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvents.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.events = action.payload
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const { signUpForEvent, cancelEventParticipation } = eventsSlice.actions
export default eventsSlice.reducer

