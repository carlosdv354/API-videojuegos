import { useState, useEffect } from "react";
import { getGames } from "../api/rawg";
import { Link } from "react-router-dom";
import Filters from "../components/Filters";

export default function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [tag, setTag] = useState("");
  const [developer, setDeveloper] = useState("");

  useEffect(() => {
    getGames({ search, year, genre, platform, tag, developer }).then(setGames);
  }, [search, year, genre, platform, tag, developer]);

  return (
    <div className="p-4">
      <h1>BIENVENIDO A TU API DE VIDEJUEOS</h1>
      {/* caja busqueda */}
      <input
        type="text"
        placeholder="Busca tu juego favorito"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      {/* llamado al componete de los filtos*/}
      <Filters setYear={setYear} setGenre={setGenre} setPlatform={setPlatform} setTag={setTag} setDeveloper={setDeveloper} />
      {/* grilla con el objeto juego */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-7.5">
        {games.map((game) => (
          <Link key={game.id} to={`/game/${game.id}`}>
            <div className="border p-2 rounded">
            <img src={game.background_image} alt={game.name} className="w-[500px] h-auto rounded-lg shadow-md my-4" />
              <h3 className="text-lg font-bold">{game.name}</h3>
              <p>Metacritic: {game.metacritic}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
