import { useRouter } from "@tanstack/react-router";
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { cn } from "../../lib/utils";

const BtnVariant = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    OULINE: "outline",
} as const;

type BtnVariant = (typeof BtnVariant)[keyof typeof BtnVariant];

const buttonStyles = {
    [BtnVariant.PRIMARY]: "bg-primary text-white r",
    [BtnVariant.SECONDARY]: "bg-slate-200",
    [BtnVariant.OULINE]: "bg-none border border-foreground",
};

type Props = {
    className?: string;
    children?: ReactNode;
    variant?: BtnVariant;
    to?: string;
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const Button = ({
    className,
    children,
    variant = BtnVariant.PRIMARY,
    to,
    ...props
}: Props) => {
    const router = useRouter();

    const handleClick = (e: any) => {
        if (to) {
            router.navigate({ to });
            return;
        }
        props.onClick?.(e);
    };

    return (
        <button
            className={cn(
                "cursor-pointer hover:opacity-90 transition-all",
                "px-4 py-2 text-center rounded-2xl",
                buttonStyles[variant],
                "",
                className
            )}
            {...props}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default Button;
