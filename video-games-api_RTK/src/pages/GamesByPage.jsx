import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { fetchGamesByCategory } from "../store/gameSlice"
import GameCard from "../components/GameCard"

const GamesByPage = () => {
  const { type, id } = useParams()
  const dispatch = useDispatch()
  const { categoryGames, status, error } = useSelector((state) => state.games)

  useEffect(() => {
    dispatch(fetchGamesByCategory({ type, id }))
  }, [dispatch, type, id])

  if (status === 'loading') return <div className="container mx-auto px-4 py-8 text-center">Cargando...</div>
  if (status === 'failed') return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-red-600">
        Games by {type}: {categoryGames[0]?.[type === "genre" ? "genre" : "tag"]?.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryGames.map((game) => (
          <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
        ))}
      </div>
    </div>
  )
}

export default GamesByPage