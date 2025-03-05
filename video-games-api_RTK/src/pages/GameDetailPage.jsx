import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { fetchGameDetails } from "../store/gameSlice";
import { addFavorite, removeFavorite } from "../store/favoritesSlice"; // Importa las acciones de favoritos
import ShinyText from '../blocks/TextAnimations/ShinyText/ShinyText';

const GameDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { gameDetails, status, error } = useSelector((state) => state.games);
  const favorites = useSelector(state => state.favorites);
  const isFavorite = favorites.some(game => game.id === parseInt(id));

  useEffect(() => {
    dispatch(fetchGameDetails(id));
  }, [dispatch, id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(parseInt(id)));
    } else {
      dispatch(addFavorite({ id: parseInt(id), name: gameDetails.name, background_image: gameDetails.background_image }));
    }
  };

  if (status === 'loading') return <div className="container mx-auto px-4 py-8 text-center">Cargando...</div>;
  if (status === 'failed') return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>;
  if (!gameDetails) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-red-600">{gameDetails.name}</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 ">
          <img src={gameDetails.background_image || "/placeholder.svg"} alt={gameDetails.name} className="w-full h-96 object-cover" />
          <div className="p-6">
          <button 
              onClick={toggleFavorite}
              className={`mb-4 px-4 py-2 rounded ${isFavorite ? 'bg-red-600 text-white' : 'bg-gray-200'} hover:shadow-md transition-shadow duration-300`}
            >
              {isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
            </button>
            <p className="mb-4 text-gray-700">{gameDetails.description_raw}</p>
            <div className="flex flex-wrap gap-8">
              <div className="flex-1 min-w-[200px]">
                <h2 className="text-2xl font-bold mb-2 text-red-600">Plataformas</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {gameDetails.platforms.map((platform) => (
                    <li key={platform.platform.id}>{platform.platform.name}</li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 min-w-[200px]">
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
              <div className="flex-1 min-w-[200px]">
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
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-2 text-red-600">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {gameDetails.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/games/tag/${tag.id}`}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-red-600 hover:text-white transition duration-300"
                  >
                    <ShinyText text={tag.name} speed={3} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GameDetailPage;