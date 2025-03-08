// events.js
// Add or modify events as you like
// The images can be the ones you have in the public folder
export const events = [
    {
      id: 1,
      title: "Game Developers Conference",
      location: "San Francisco",
      image: "https://www.eventsforgamers.com/wp-content/uploads/2024/03/Banner-GDC-new2024.jpg",
      description: "Asiste a una de las ferias de videojuegos más prestigiosas del mundo.",
    },
    {
      id: 2,
      title: "LEC Roadtrip",
      location: "Madrid Arena (Madrid)",
      image: "https://esports.as.com/2025/03/07/league-of-legends/lcs-eu-2141/LEC-Roadtrip-estrena-Madrid-abril_1882321752_1301453_1440x600.jpg",
      description: "Partidos casteados en español por el equipo de Movistar KOI formado por Ibai, KNekro, Kuentin, Mellado, Skain o Reven.",
    },
    {
      id: 3,
      title: "Final Iberian Cup",
      location: "Estadio de la Rosaleda (Málaga)",
      image: "https://insights.lvp.global/wp-content/uploads/2022/11/LogoLVP_RGB_positivo-1.png",
      description: "Vive la fase final con los mejores jugadores compitiendo en los e-sports más conocidos.",
    },
    {
      id: 4,
      title: "Hans Zimmer & Symphonic Video Games",
      location: "Palau de la Música (Barcelona)",
      image: "https://www.masescena.es/wp-content/uploads/2025/03/Hans-Zimmer-1024x466.png",
      description: "Concierto sinfónico con la música de videojuegos, dirigido por Hans Zimmer",
    },
    {
      id: 5,
      title: "Granada Gaming 2025",
      location: "Fermasa (Granada)",
      image: "https://www.granadagaming.com/wp-content/uploads/sites/2/2022/11/Cartel-Granada-Gaming-2023.jpg",
      description: "Más Esports, más desarrollo, más torneos, más actividades, más gamer!",
    },
  ]
  
  // simulate api request that returns events after delay
  export const fetchEvents = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(events)
      }, 500) // 500ms delay
    })
  }
  
  