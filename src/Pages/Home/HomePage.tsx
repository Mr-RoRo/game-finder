import { useEffect, useState } from "react";
import { DataProvider } from "../../Core/DataProvider";
import { Platform } from "../../Components/Platforms";
import GameGrid from "./GameGrid";

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
  const [games, setGames] = useState<Game[]>([]);
  const getGames = async () => {
    try {
      const response = await DataProvider.get<Game[]>(
        `https://api.rawg.io/api/games?key=${import.meta.env.VITE_API_KEY}`
      );
      setGames(response.results);
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
    <GameGrid games={games} />
  );
};

export default HomePage;