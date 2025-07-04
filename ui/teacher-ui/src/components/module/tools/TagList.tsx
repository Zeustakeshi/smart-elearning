import { NameTag } from "@/types/tag";
import Tag from "./Tag";
import { useState } from "react";

const TagList: React.FC = () => {
  const [isSelected, setIsSelected] = useState<number | null>(0);

  const handleClick = (id: number) => {
    setIsSelected(id);
    console.log(id, isSelected);
  };

  return (
    <div className="flex gap-4">
      {NameTag.map((tag) => (
        <Tag
          key={tag.id}
          icon={tag.icon}
          name={tag.name}
          color={tag.color}
          isSelected={tag.id === isSelected}
          onClick={handleClick}
          id={tag.id}
        />
      ))}
    </div>
  );
};

export default TagList;
