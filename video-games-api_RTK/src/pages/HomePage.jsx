import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPopularGames } from '../store/gameSlice';
import GameCard from '../components/GameCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import FuzzyText from '../components/FuzzyText';

const HomePage = () => {
  const dispatch = useDispatch();
  const { popularGames, status, error } = useSelector((state) => state.games);
  const hoverIntensity = 0.5;
  const enableHover = true;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPopularGames());
    }
  }, [status, dispatch]);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  if (status === 'loading') return <div className="text-center text-gray-600 mt-5 ">Cargando...</div>;
  if (status === 'failed') return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <>
      <div className="container mx-auto px-4 py-8 bg-gray-100 shadow-lg mt-2">
        <section className="mb-16 mt-8">
          <div className="flex justify-center items-center mb-8">

          </div>

          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={false }
            showDots={false}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3500}
            keyBoardControl={true}
            customTransition="all .3"
            transitionDuration={100}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px mx-2"
          >
            {popularGames.length > 0 ? (
              popularGames.map((game) => (
                <GameCard key={game.id} id={game.id} name={game.name} background_image={game.background_image} />
              ))
            ) : (
              <p className="text-center text-gray-600">No se encontraron títulos</p>
            )}
          </Carousel>
        </section>

        <div className="bg-white rounded-lg shadow-md p-8">
          <section className="text-center">
            <div className="flex justify-center items-center mb-4">
              <FuzzyText
                fontSize="clamp(2rem, 2vw, 3rem)"
                fontWeight={700}
                color="#ef4444"
                baseIntensity={0.2}
                hoverIntensity={hoverIntensity}
                enableHover={enableHover}
              >
                ¿Quieres ver más?
              </FuzzyText>
            </div>
            <p className="mb-6 text-gray-700">Busca y descubre miles de juegos en nuestra extensa biblioteca.</p>
            <Link
              to="/games"
              className="bg-black text-red-400 px-8 py-3 rounded-full hover:bg-red-600 hover:text-white transition duration-300 inline-block"
            >
              Ver todos los juegos
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;