import { useParams } from "react-router-dom";
import { DataProvider } from "../../Core/DataProvider";
import { useEffect, useState } from "react";
import { Platform } from "../../Components/Platforms";
import imageOpt from "../../Core/ImageUrl";

interface Genre {
  id: number;
  name: string;
}

interface Developer {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

interface GameDetail {
  id: number;
  slug: string;
  name: string;
  description_raw: string;
  released: string;
  background_image: string;
  metacritic: number;
  parent_platforms: { platform: Platform }[];
  genres: Genre[];
  developers: Developer[];
  tags: Tag[];
}

const GamePage = () => {
  const { slug } = useParams();
  const [game, setGame] = useState<GameDetail>({} as GameDetail);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const gameInfo = [
    {
      label: "Platform",
      value: game.parent_platforms?.map((p) => p.platform.name).join(", "),
    },
    { label: "Genres", value: game.genres?.map((g) => g.name).join(", ") },
    { label: "Released", value: game?.released },
    {
      label: "Developer",
      value: game.developers?.map((d) => d.name).join(", "),
    },
  ];

  const getGame = async () => {
    try {
      const response = await DataProvider.get<GameDetail>(
        `https://api.rawg.io/api/games/${slug}?key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setGame(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGame();
  }, []);
  return loading ? (
    <span className="loading loading-infinity loading-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
  ) : (
    <div className="game-details">
      <div className="relative flex flex-col items-center mb-2">
        <img
          src={imageOpt(game.background_image)}
          alt={`${game.name} background`}
          className="w-full h-60 rounded-2xl"
        />
        <span className="bg-gradient-to-t from-base-100 w-full h-full absolute top-0" />
        <div className="absolute bottom-3 text-center">
          <h1 className="text-3xl font-bold sm:text-3xl lg:text-4xl xl:text-5xl">
            {game.name}
          </h1>
        </div>
      </div>
      <h2 className="text-slate-500">Description</h2>
      <p className={`${!isExpanded && "line-clamp-6"}`}>
        {game.description_raw}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-500"
      >
        {isExpanded ? "Show Less" : "Read More"}
      </button>
      <div className="mt-2 mb-4 grid grid-cols-2 gap-4">
        {gameInfo.map((info) => (
          <div key={info.label}>
            <p className="text-slate-500">{info.label}</p>
            <p>{info.value}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="text-slate-500">Tags</p>
        <p>{game.tags.map((tag) => tag.name).join(", ")}</p>
      </div>
    </div>
  );
};

export default GamePage;
