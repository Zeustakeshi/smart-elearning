import { Link } from "@tanstack/react-router";
import { cn } from "../../lib/utils";

type Props = {
    size?: number;
};

const Logo = ({ size }: Props) => {
    return (
        <Link to="/" className={cn("font-bold text-primary text-3xl")}>
            Smart elararing
        </Link>
    );
};

export default Logo;
