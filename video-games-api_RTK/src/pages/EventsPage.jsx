"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllEvents, signUpForEvent, cancelEventParticipation } from "../store/eventSlice"
import { Link } from "react-router-dom"

const EventsPage = () => {
  const dispatch = useDispatch()
  const { events, userEvents, status, error } = useSelector((state) => state.events)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllEvents())
    }
  }, [status, dispatch])

  const handleSignUp = (eventId) => {
    dispatch(signUpForEvent(eventId))
  }

  const handleCancelParticipation = (eventId) => {
    dispatch(cancelEventParticipation(eventId))
  }

  if (status === "loading") return <div className="text-center text-gray-600 mt-5">Cargando eventos...</div>
  if (status === "failed") return <div className="text-center text-red-600">Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Eventos cercanos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={`${event.image}`}
              alt={event.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "/placeholder.jpg"
              }}
            />
            <div className="p-4">
              <h2 className="text-xl text-red-500 font-bold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Location:</span> {event.location}
              </p>
              <p className="text-gray-700 mb-4">{event.description}</p>

              {userEvents.includes(event.id) ? (
                <button
                  onClick={() => handleCancelParticipation(event.id)}
                  className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition"
                >
                  Cancelar asistencia
                </button>
              ) : (
                <button
                  onClick={() => handleSignUp(event.id)}
                  className="w-full bg-black text-red-400 px-8 py-3 rounded-full hover:text-yellow-300 transition duration-300 inline-block"
                >
                  Quiero asistir
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/my-events"
          className="bg-black text-red-400 px-8 py-3 rounded-full hover:bg-red-600 hover:text-white transition duration-300 inline-block"
        >
          Mis eventos
        </Link>
      </div>
    </div>
  )
}

export default EventsPage

