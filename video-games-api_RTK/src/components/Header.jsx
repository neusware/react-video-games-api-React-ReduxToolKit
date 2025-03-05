import { Link } from "react-router-dom"
import CircularText from "./CircularText"

function Header() {
  return (
    <header className="bg-black text-red-400 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center"> 
          <CircularText text="**DIW**REACT**APP***" onHover="speedUp" spinDuration={20} className="w-16 h-16 mr-2" />
        
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/games" className="hover:text-gray-300">
              Biblioteca
            </Link>
          </li>
          <li>
            <Link to="/publishers" className="hover:text-gray-300">
              Editores
            </Link>
          </li>
          <li>
          <Link to="/favorites" className="hover:text-gray-300">
            Favoritos
          </Link>
          
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header