import { useEffect, useState } from "react";
import { DataProvider } from "../../Core/DataProvider";
import { Platform } from "../../Components/Platforms";
import GameGrid from "./GameGrid";
import { ApiResponse } from "../../Core/Request";

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  metacritic: number;
  parent_platforms: { platform: Platform }[];
}

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<ApiResponse<Game[]>>(
    {} as ApiResponse<Game[]>
  );
  const getGames = async () => {
    try {
      const response = await DataProvider.get<ApiResponse<Game[]>>(
        `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}`
      );
      setGames(response);
    } finally {
      setLoading(false);
    }
  };
  const fetchGamesNextPage = async () => {
    try {
      const response = await DataProvider.get<ApiResponse<Game[]>>(games.next);
      setGames({
        ...response,
        results: [...games.results, ...response.results],
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getGames();
  }, []);
  return loading ? (
    <span className="loading loading-infinity loading-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
  ) : (
    <GameGrid
      games={games.results}
      fetchFunction={fetchGamesNextPage}
      hasNext={Boolean(games.next)}
    />
  );
};

export default HomePage;
