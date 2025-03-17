import axios from "axios";

//coneccion API a rawg.io
const API_URL = "https://api.rawg.io/api";

//logica y espesificaciones de coneccion
export const getGames = async ({ search = "", year = "", genre = "", platform = "", tag = "", developer = "" }) => {
  const params = {
    key: import.meta.env.VITE_RAWG_API_KEY,
    search,
    ordering: "-metacritic",
    page_size: 20,
  };

  if (year) params.dates = `${year}-01-01,${year}-12-31`;
  if (genre) params.genres = genre;
  if (platform) params.platforms = platform;
  if (tag) params.tags = tag;
  if (developer) params.developers = developer;

  const response = await axios.get(`https://api.rawg.io/api/games`, { params });
  return response.data.results;
};