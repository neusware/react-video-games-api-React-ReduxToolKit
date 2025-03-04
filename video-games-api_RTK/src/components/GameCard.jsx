import { Link } from "react-router-dom"

function GameCard({ id, name, background_image }) {
  return (
    <Link to={`/game/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={background_image || "/placeholder.svg"} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{name}</h3>
        </div>
      </div>
    </Link>
  )
}

export default GameCard