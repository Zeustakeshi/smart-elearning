import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type Props = {
    children?: ReactNode;
    className?: string;
};

const AppContainer = ({ children, className }: Props) => {
    return <div className={cn("mx-auto px-5", className)}>{children}</div>;
};

export default AppContainer;
