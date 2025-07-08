import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "../../../../lib/utils";

type Props = {
    title: string;
    icon: ReactNode;
    bgColor: string;
    to?: string;
    className?: string;
    iconClassName?: string;
};

const ToolItem = ({
    title,
    icon,
    to,
    bgColor,
    className,
    iconClassName,
}: Props) => {
    return (
        <Link
            to={to}
            className={cn(
                "group transition-all flex flex-col items-center justify-start gap-2 cursor-pointer",
                className
            )}
        >
            <div
                style={{
                    background: bgColor,
                }}
                className={cn(
                    "size-[50px]  rounded-2xl  text-white flex justify-center items-center group-hover:[&>svg]:size-[30px] [&>svg]:transition-all  [&>svg]:size-[20px]",
                    iconClassName
                )}
            >
                {icon}
            </div>
            <div className="font-semibold text-sm text-slate-700 max-w-[95px] text-center">
                {title}
            </div>
        </Link>
    );
};

export default ToolItem;
