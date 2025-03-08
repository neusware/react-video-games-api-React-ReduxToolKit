
import { useSelector, useDispatch } from "react-redux"
import { cancelEventParticipation } from "../store/eventSlice"
import { Link } from "react-router-dom"

const MyEventsPage = () => {
  const dispatch = useDispatch()
  const { events, userEvents } = useSelector((state) => state.events)

  // Filter events to only show those the user has signed up for
  const myEvents = events.filter((event) => userEvents.includes(event.id))

  const handleCancelParticipation = (eventId) => {
    dispatch(cancelEventParticipation(eventId))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Mis eventos</h1>

      {myEvents.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Aún no vas a asistir a ningún evento</p>
          {/* <Link
            to="/events"
            className="bg-black text-red-400 px-8 py-3 rounded-full hover:bg-red-600 hover:text-white transition duration-300 inline-block"
          >
            Buscar eventos
          </Link> */}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Localización:</span> {event.location}
                </p>
                <p className="text-gray-700 mb-4">{event.description}</p>

                <button
                  onClick={() => handleCancelParticipation(event.id)}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                >
                  Cancel Participation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/events"
          className="bg-black text-red-400 px-8 py-3 rounded-full hover:bg-red-600 hover:text-white transition duration-300 inline-block"
        >
          Volver a todos los eventos
        </Link>
      </div>
    </div>
  )
}

export default MyEventsPage

