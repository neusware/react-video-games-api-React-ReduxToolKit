import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from "react-router-dom"
import { fetchGameDetails } from "../store/gameSlice"

const GameDetailPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { gameDetails, status, error } = useSelector((state) => state.games)

  useEffect(() => {
    dispatch(fetchGameDetails(id))
  }, [dispatch, id])

  if (status === 'loading') return <div className="container mx-auto px-4 py-8 text-center">Cargando...</div>
  if (status === 'failed') return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>
  if (!gameDetails) return null

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-red-600">{gameDetails.name}</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <img src={gameDetails.background_image || "/placeholder.svg"} alt={gameDetails.name} className="w-full h-96 object-cover" />
          <div className="p-6">
            <p className="mb-4 text-gray-700">{gameDetails.description_raw}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-red-600">Plataformas</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {gameDetails.platforms.map((platform) => (
                    <li key={platform.platform.id}>{platform.platform.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-red-600">Géneros</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {gameDetails.genres.map((genre) => (
                    <li key={genre.id}>
                      <Link to={`/games/genre/${genre.id}`} className="hover:text-red-600">
                        {genre.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-red-600">Tags</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {gameDetails.tags.map((tag) => (
                    <li key={tag.id}>
                      <Link to={`/games/tag/${tag.id}`} className="hover:text-red-600">
                        {tag.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-red-600">Publisher</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {gameDetails.publishers.map((publisher) => (
                    <li key={publisher.id}>
                      <Link to={`/publisher/${publisher.id}`} className="hover:text-red-600">
                        {publisher.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default GameDetailPage