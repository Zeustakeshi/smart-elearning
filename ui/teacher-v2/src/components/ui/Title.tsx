import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

const TitleVariant = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
} as const;

type TitleVariant = (typeof TitleVariant)[keyof typeof TitleVariant];

const titleStyles = {
    [TitleVariant.PRIMARY]: "font-semibold text-2xl",
    [TitleVariant.SECONDARY]: "font-semibold text-md",
};

type Props = {
    children?: ReactNode;
    className?: string;
    variant?: TitleVariant;
    showUnderline?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

const Title = ({
    variant = TitleVariant.PRIMARY,
    children,
    className,
    showUnderline = false,
    ...props
}: Props) => {
    return (
        <h3
            className={cn(
                "group relative w-max cursor-pointer",
                titleStyles[variant],
                className
            )}
            {...props}
        >
            {children}
            <span className="group-hover:w-[100%] absolute  transition-all  translate-0.5 bottom-[-5px] left-0 w-[60%] h-[3px] rounded-full bg-primary"></span>
        </h3>
    );
};

export default Title;
