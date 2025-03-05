import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import GameDetailPage from "./pages/GameDetailPage";
import GamesByPage from "./pages/GamesByPage";
import PublisherPage from "./pages/PublisherPage";
import PublishersPage from "./pages/PublishersPage";
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/game/:id" element={<GameDetailPage />} />
            <Route path="/games/:type/:id" element={<GamesByPage />} />
            <Route path="/publisher/:id" element={<PublisherPage />} />
            <Route path="/publishers" element={<PublishersPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;