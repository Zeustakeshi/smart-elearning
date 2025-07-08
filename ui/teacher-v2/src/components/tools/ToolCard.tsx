import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { FaRegStar } from "react-icons/fa";

type Props = {
    title: string;
    description: string;
    icon: ReactNode;
    bgColor: string;
    to?: string;
};

const ToolCard = ({ title, description, icon, bgColor, to }: Props) => {
    return (
        <Link
            to={to}
            className="group flex justify-start items-center gap-4 bg-stone-100 hover:shadow-lg transition-all cursor-pointer p-5 max-w-[400px] rounded-xl "
        >
            <div
                style={{
                    background: bgColor,
                }}
                className="size-[60px] [&>svg]:size-[20px]  bg-primary text-white flex justify-center items-center rounded-xl group-hover:[&>svg]:size-[30px]  [&>svg]:transition-all  "
            >
                {icon}
            </div>
            <div className="flex-1 w-full flex flex-col items-start justify-center">
                <div className="flex w-full justify-between items-center">
                    <h4 className="text-lg font-semibold">{title}</h4>
                    <p className="cursor-pointer">
                        <FaRegStar size={18}></FaRegStar>
                    </p>
                </div>

                <p className="text-sm text-slate-500">{description}</p>
            </div>
        </Link>
    );
};

export default ToolCard;
