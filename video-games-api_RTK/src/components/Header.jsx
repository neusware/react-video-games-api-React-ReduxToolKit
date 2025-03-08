"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import CircularText from "./CircularText"

function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
  }

  return (
    <header className="bg-black text-red-400 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <CircularText text="**DIW**REACT**APP***" onHover="speedUp" spinDuration={20} className="w-16 h-12 mr-2" />
        </Link>
        <ul className="flex space-x-4 items-center">
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
          <li>
            <Link to="/events" className="hover:text-gray-300">
              Eventos
            </Link>
          </li>
          {/* User Profile Icon */}
          <li className="relative ml-2">
            <button
              onClick={toggleUserMenu}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-800 transition"
              aria-label="User menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-red-400"
              >
                <circle cx="12" cy="8" r="5"></circle>
                <path d="M20 21a8 8 0 1 0-16 0"></path>
              </svg>
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link
                  to="/favorites"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  Mis Favoritos
                </Link>
                <Link
                  to="/my-events"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowUserMenu(false)}
                >
                  Mis Eventos
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

