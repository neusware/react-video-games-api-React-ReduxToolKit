import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { fetchPublisherDetails, fetchPublisherGames } from "../store/publisherSlice"
import GameCard from "../components/GameCard"

const PublisherPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { publisherDetails, publisherGames, status, error } = useSelector((state) => state.publishers)

  useEffect(() => {
    dispatch(fetchPublisherDetails(id))
    dispatch(fetchPublisherGames({ id }))
  }, [dispatch, id])

  if (status === 'loading') return <div className="container mx-auto px-4 py-8 text-center">Cargando...</div>
  if (status === 'failed') return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>
  if (!publisherDetails) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-red-600">{publisherDetails.name}</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 p-6">
        <h2 className="text-2xl font-bold mb-4 text-red-600">About</h2>
        <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: publisherDetails.description }} />
        <h2 className="text-2xl font-bold mb-4 text-red-600">Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {publisherGames.map((game) => (
            <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PublisherPage