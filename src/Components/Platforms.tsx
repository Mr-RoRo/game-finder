import { IconType } from "react-icons";
import { FaWindows, FaPlaystation, FaXbox } from "react-icons/fa";
export interface Platform {
  id: number;
  name: string;
  slug: string;
}
interface Props {
  platforms: Platform[];
}
const Platforms = ({ platforms }: Props) => {
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
  };
  return (
    <div className="flex space-x-2 text-white">
      {platforms?.map((platform) => {
        const IconComponent = iconMap[platform.slug];
        return IconComponent ? <IconComponent key={platform.id} /> : null;
      })}
    </div>
  );
};

export default Platforms;
