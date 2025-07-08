import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type Props = {
    to?: string;
    icon?: ReactNode;
    label?: string;
    className?: string;
};

const MainSidebarItem = ({ icon, to, label, className }: Props) => {
    return (
        <Link
            className={cn(
                "size-[70px] flex flex-col items-center justify-center gap-2 rounded-xl  hover:bg-foreground transition-all",
                className
            )}
            to={to}
            activeProps={{
                className: cn("bg-foreground"),
            }}
        >
            <div className=" [&>svg]:size-[20px]">{icon}</div>
            <div className="text-xs font-semibold">{label}</div>
        </Link>
    );
};

export default MainSidebarItem;
