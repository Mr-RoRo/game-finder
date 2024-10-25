import InfiniteScroll from "react-infinite-scroll-component";
import GameCard from "./GameCard";
import { Game } from "./HomePage";

interface Props {
  games: Game[];
  fetchFunction: () => void;
  hasNext: boolean;
}
const GameGrid = ({ games, fetchFunction, hasNext }: Props) => {
  return games.length === 0 ? (
    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      No games found
    </h1>
  ) : (
    <InfiniteScroll
      dataLength={games.length}
      next={fetchFunction}
      hasMore={hasNext}
      loader={
        <span className="loading loading-infinity loading-lg mt-2 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
      }
      endMessage={
        <p className="text-center text-xl">Yay! You have seen it all</p>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {games.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default GameGrid;
