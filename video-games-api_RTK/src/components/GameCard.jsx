import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';

function GameCard({ id, name, background_image }) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isFavorite = favorites.some(game => game.id === id);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite({ id, name, background_image }));
    }
  };

  return (
    <Link to={`/game/${id}`} className="block relative">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={background_image || "/placeholder.svg"} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg mb-2">{name}</h3>
            <button 
              onClick={toggleFavorite}
              className={`p-2 rounded-full ${isFavorite ? 'bg-red-200' : 'bg-gray-100'}`}
            >
              ❤
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;