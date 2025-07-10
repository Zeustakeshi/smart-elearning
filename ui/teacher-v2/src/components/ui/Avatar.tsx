import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    src?: string;
    alt?: string;
    size?: number;
};

const Avatar = ({ className, src, alt, size = 50 }: Props) => {
    return (
        <div
            style={{
                width: size,
                height: size,
            }}
            className={cn("rounded-full overflow-hidden", className)}
        >
            <img className="size-full object-cover" src={src} alt={alt} />
        </div>
    );
};

export default Avatar;
