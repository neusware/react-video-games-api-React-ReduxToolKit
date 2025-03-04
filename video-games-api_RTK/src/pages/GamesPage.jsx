import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { searchGames, fetchPopularGames } from '../store/gameSlice'
import GameCard from "../components/GameCard"

function GamesPage() {
  const dispatch = useDispatch();
  const { searchResults, popularGames, status, error, totalPages } = useSelector((state) => state.games);
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPopularGames());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        dispatch(searchGames({ query: searchTerm, page: currentPage }));
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, currentPage, dispatch])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const displayedGames = searchTerm ? searchResults : popularGames;

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Biblioteca</h1>
      <input
        type="text"
        placeholder="Buscar juegos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-8 border rounded"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedGames.length > 0 ? (
          displayedGames.map((game) => (
            <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
          ))
        ) : (
          <p>No se encontraron juegos</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === page ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default GamesPage