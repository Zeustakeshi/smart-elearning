import type React from "react";

import type { TagProps } from "@/types/tag";

const Tag: React.FC<TagProps> = ({
  icon: Icon,
  name,
  color,
  isSelected,
  onClick,
  id,
}) => {
  return (
    <div key={id} className="flex gap-2 group" onClick={() => onClick?.(id!)}>
      <div
        className={` border-1 p-2 rounded-4xl flex items-center gap-2 mt-4 hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-200 transition-colors duration-200 hover:cursor-pointer ${isSelected ? "bg-blue-400 border-1 border-black" : "bg-transparent"}`}
      >
        <Icon className={`h-5 w-5 ${color}  `} />
        <p className={`${isSelected ? "text-white" : "text-black"}`}>{name}</p>
      </div>
    </div>
  );
};

export default Tag;
