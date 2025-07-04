import type { CardProps } from "@/types/tag";
import React from "react";
import { StarIcon } from "@heroicons/react/24/outline";

const Card: React.FC<CardProps> = ({ iconleft: Icon, title, subtitle }) => {
  return (
    <div className="flex items-center gap-2 border-1 p-2 pb-4  rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all duration-150">
      <div>
        <Icon className="h-8 w-8 "></Icon>
      </div>

      <div className="">
        <p className="text-xs font-bold">{title}</p>
        <p className="text-xs">{subtitle}</p>
      </div>
      <StarIcon className="h-6 w-6 text-gray-500 ml-auto" />
    </div>
  );
};

export default Card;
