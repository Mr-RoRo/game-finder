import { Dispatch, SetStateAction } from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  getGames: () => void;
}

const SearchGame = ({ search, setSearch, getGames }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <label className="input input-bordered flex items-center gap-2 mb-6 rounded-full ">
      <input
        type="text"
        className="grow"
        placeholder="Search name of the game..."
        value={search}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            getGames();
          }
        }}
      />
      <FiSearch />
    </label>
  );
};

export default SearchGame;
