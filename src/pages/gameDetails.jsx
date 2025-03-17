import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

{/* pagina del detallando un juego especifico (se hace a esta clienado en la imagen de la pagina pcinpal) */ }
export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_RAWG_API_KEY;
    axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`).then((res) => setGame(res.data));
  }, [id]);

  if (!game) return <p>Cargando...</p>;

  return (
    <div className="p-4">
      <div className="border p-5 rounded w-[600px] h-auto">
        <h1 className="text-3xl font-bold">{game.name}</h1>
        <img src={game.background_image} alt={game.name} className="w-[500px] h-auto rounded-lg shadow-md my-4 mx-auto" />
        {/* claficacion del juego en base a parametros, genero, plataforma, claficacion de metacritic, año y descripcion */}
        <p><strong>Género:</strong> {game.genres.map((g) => g.name).join(", ")}</p>
        <p><strong>Plataformas:</strong> {game.platforms.map((p) => p.platform.name).join(", ")}</p>
        <p><strong>Puntuación:</strong> {game.metacritic}</p>
        <p><strong>Lanzamiento:</strong> {game.released}</p>
        <p><strong>Descripción:</strong> <span dangerouslySetInnerHTML={{ __html: game.description }} /></p>
      </div>
      <br></br>
      {/* boton para regresar al inicio */}
      <button onClick={() => navigate("/")} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        Volver
      </button>
    </div>
  );
}
