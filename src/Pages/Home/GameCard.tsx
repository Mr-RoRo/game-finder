import Platforms from "../../Components/Platforms";
import { SiMetacritic } from "react-icons/si";
import { MdAccessTime } from "react-icons/md";
import { Game } from "./HomePage";
import imageOpt from "../../Core/ImageUrl";

interface Props {
  game: Game;
}
const GameCard = ({ game }: Props) => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl h-80 group">
      <figure>
        <img
          src={imageOpt(game.background_image)}
          alt={game.name}
          className="h-60 w-full object-cover transition-transform transform group-hover:scale-110 group-hover:rotate-3"
        />
      </figure>
      <div className="card-body">
        <Platforms
          platforms={game.parent_platforms.map((platform) => platform.platform)}
        />
        <h2 className="card-title text-white">{game.name}</h2>
        <div className="flex justify-between">
          <div className="badge badge-outline badge-secondary space-x-1">
            <SiMetacritic />
            <p>{game.metacritic}</p>
          </div>
          <div className="badge badge-outline badge-secondary space-x-1">
            <MdAccessTime />
            <p>{game.released}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
