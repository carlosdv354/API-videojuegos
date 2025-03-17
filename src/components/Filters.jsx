import { useState, useEffect } from "react";
import axios from "axios";
{/* componete externo con todos los filtros para dejar el codigo de la pagina principal mas limpio */}
export default function Filters({ setYear, setGenre, setPlatform, setTag, setDeveloper }) {
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [tags, setTags] = useState([]);
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_RAWG_API_KEY;

    axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`).then((res) => setGenres(res.data.results));
    axios.get(`https://api.rawg.io/api/platforms?key=${apiKey}`).then((res) => setPlatforms(res.data.results));
    axios.get(`https://api.rawg.io/api/tags?key=${apiKey}`).then((res) => setTags(res.data.results));
    axios.get(`https://api.rawg.io/api/developers?key=${apiKey}`).then((res) => setDevelopers(res.data.results));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
      <select onChange={(e) => setYear(e.target.value)} className="border p-2 rounded">
        <option value="">Todos los años</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
      </select>

      <select onChange={(e) => setGenre(e.target.value)} className="border p-2 rounded">
        <option value="">Todos los géneros</option>
        {genres.map((g) => (
          <option key={g.id} value={g.slug}>
            {g.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setPlatform(e.target.value)} className="border p-2 rounded">
        <option value="">Todas las plataformas</option>
        {platforms.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setTag(e.target.value)} className="border p-2 rounded">
        <option value="">Todos los tags</option>
        {tags.map((t) => (
          <option key={t.id} value={t.slug}>
            {t.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => setDeveloper(e.target.value)} className="border p-2 rounded">
        <option value="">Todos los desarrolladores</option>
        {developers.map((d) => (
          <option key={d.id} value={d.slug}>
            {d.name}
          </option>
        ))}
      </select>
    </div>
  );
}