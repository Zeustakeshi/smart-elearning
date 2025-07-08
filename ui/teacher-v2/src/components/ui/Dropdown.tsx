import { Menu, Transition } from "@headlessui/react";
import {
    createContext,
    Fragment,
    useContext,
    useState,
    type ReactNode,
} from "react";
import { cn } from "../../lib/utils";

type DropdownContextType = {
    value?: any;
    label: string;
    onChange: (value: any) => void;
    setLabel: (value: string) => void;
};

const DropdownContext = createContext<DropdownContextType | undefined>(
    undefined
);

const useDropdown = () => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error("useDropdown must be used within a Dropdown");
    }
    return context;
};

type DropdownProps = {
    className?: string;
    children: ReactNode;
    onChange: (value: any) => void;
    value?: any;
};

const Dropdown = ({ className, children, onChange, value }: DropdownProps) => {
    const [label, setLabel] = useState<string>("");
    return (
        <DropdownContext.Provider
            value={{
                value,
                label,
                onChange,
                setLabel,
            }}
        >
            <Menu as="div" className={cn("relative w-max", className)}>
                {children}
            </Menu>
        </DropdownContext.Provider>
    );
};

type DropdownTriggerProps = {
    className?: string;
};

const DropdownTrigger = ({ className }: DropdownTriggerProps) => {
    const { label } = useDropdown();
    return (
        <Menu.Button
            type="button"
            className={cn(
                "px-4 py-3 border border-foreground rounded-xl cursor-pointer",
                className
            )}
        >
            {label || "Chọn 1 giá trị"}
        </Menu.Button>
    );
};

type DropdownContentProps = {
    className?: string;
    children: ReactNode;
};

const DropdownContent = ({ className, children }: DropdownContentProps) => {
    return (
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items
                className={cn(
                    "absolute top-[105%] left-0 bg-white shadow-lg w-max rounded-xl mt-1 overflow-hidden",
                    className
                )}
            >
                <div className="flex flex-col">{children}</div>
            </Menu.Items>
        </Transition>
    );
};

type DropdownItemProps = {
    className?: string;
    activeClassName?: string;
    value: any;
    label: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const DropdownItem = ({
    className,
    activeClassName,
    label,
    value,
    ...props
}: DropdownItemProps) => {
    const { onChange, setLabel } = useDropdown();
    return (
        <Menu.Item>
            {({ active }) => (
                <button
                    onClick={() => {
                        onChange(value);
                        setLabel(label);
                    }}
                    type="button"
                    className={cn(
                        "hover:bg-stone-100 px-3 py-2 cursor-pointer text-left",
                        className,
                        { [activeClassName || ""]: active }
                    )}
                    {...props}
                >
                    {label}
                </button>
            )}
        </Menu.Item>
    );
};

export { Dropdown, DropdownContent, DropdownItem, DropdownTrigger };
