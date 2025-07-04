import type { ElementType } from "react";

import {
  StarIcon,
  AdjustmentsVerticalIcon,
  PlusIcon,
  HashtagIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,

  NewspaperIcon
} from '@heroicons/react/24/solid';


export interface TagProps {
  id?: number; // Optional, dùng trong NameTag
  icon: ElementType;
  name: string;
  color: string;
  isSelected?:boolean; 
  onClick?:(id: number) => void
}

export interface CardProps{
    id?: number;
    iconleft: ElementType;
    title: string;
    subtitle:string
}

export const NameTag: TagProps[] = [
  { id: 1, icon: StarIcon, name: 'My Favorite', color: 'fill-yellow-400' },
  { id: 2, icon: AdjustmentsVerticalIcon, name: 'Plan', color: 'fill-gray-700' },
  { id: 3, icon: PlusIcon, name: 'Create', color: 'fill-gray-700' },
  { id: 4, icon: HashtagIcon, name: 'Different', color: 'fill-gray-700' },
  { id: 5, icon: QuestionMarkCircleIcon, name: 'Support', color: 'fill-gray-700' },
  { id: 6, icon: AcademicCapIcon, name: 'Learn', color: 'fill-gray-700' },
];


export const NameCard: CardProps[] =[
    {id: 1,iconleft:NewspaperIcon, title:"Công cụ A", subtitle:"Công cụ B" },
    {id: 2,iconleft:NewspaperIcon, title:"Công cụ A", subtitle:"Công cụ B" },
    {id: 3,iconleft:NewspaperIcon, title:"Công cụ A", subtitle:"Công cụ B" },
    {id: 4,iconleft:NewspaperIcon, title:"Công cụ A", subtitle:"Công cụ B" },
]



