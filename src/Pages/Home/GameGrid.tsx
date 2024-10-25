import GameCard from "./GameCard";
import { Game } from "./HomePage";

interface Props {
  games: Game[];
}
const GameGrid = ({ games }: Props) => {
  return games.length === 0 ? (
    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      No games found
    </h1>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {games.map((game) => (
        <GameCard game={game} key={game.id} />
      ))}
    </div>
  );
};

export default GameGrid;
