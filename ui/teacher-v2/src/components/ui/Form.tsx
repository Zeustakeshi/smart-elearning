import {
    cloneElement,
    createContext,
    forwardRef,
    isValidElement,
    useContext,
    useId,
    type HTMLAttributes,
    type JSX,
    type LabelHTMLAttributes,
    type ReactNode,
} from "react";
import {
    Controller,
    FormProvider,
    useFormContext,
    type FieldPath,
    type FieldValues,
} from "react-hook-form";
import { cn } from "../../lib/utils"; // Utility to combine class names

// The Form component is just a wrapper around react-hook-form's FormProvider
// It helps manage form state across all form components
const Form = FormProvider;

// Create a context to store the field name
// This helps child components know which form field they're working with
type FormFieldContextValue = {
    name: string; // The name of the form field
};
const FormFieldContext = createContext<FormFieldContextValue>({
    name: "",
});

// Create a context to store a unique ID for form items
// This is used to link labels and inputs for accessibility
type FormItemContextValue = {
    id: string; // A unique ID for the form item
};
const FormItemContext = createContext<FormItemContextValue>({
    id: "",
});

// FormField wraps react-hook-form's Controller
// It connects a form field to the form state and provides its name to children
type FormFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName; // The field name (e.g., "username")
    control: any; // From react-hook-form, manages form state
    render: (props: any) => JSX.Element; // Function to render the field
};
const FormField = <TFieldValues extends FieldValues>({
    name,
    control,
    render,
}: FormFieldProps<TFieldValues>) => {
    return (
        <FormFieldContext.Provider value={{ name }}>
            <Controller
                name={name}
                control={control}
                render={(data) => {
                    return render(data);
                }}
            />
        </FormFieldContext.Provider>
    );
};

// A hook to get form field information
// It retrieves the field state, errors, and IDs for accessibility
const useFormField = () => {
    const fieldContext = useContext(FormFieldContext); // Get the field name
    const itemContext = useContext(FormItemContext); // Get the unique ID
    const form = useFormContext(); // Get form state from react-hook-form

    // Ensure the hook is used within a FormProvider
    if (!form) {
        throw new Error(
            "useFormField must be used inside a FormProvider component."
        );
    }

    // Ensure the hook is used within a FormField
    if (!fieldContext.name) {
        throw new Error(
            "useFormField must be used inside a FormField component."
        );
    }

    const { getFieldState, formState } = form;
    const fieldState = getFieldState(fieldContext.name, formState); // Get field state (e.g., errors)
    const { id } = itemContext;

    return {
        id, // Unique ID for the field
        name: fieldContext.name, // Field name
        formItemId: `${id}-form-item`, // ID for the input element
        formMessageId: `${id}-form-item-message`, // ID for error messages
        error: fieldState.error, // Error message, if any
        invalid: fieldState.invalid, // Whether the field has an error
    };
};

type FormControlProps = {
    children: ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const FormControl = forwardRef(
    ({ children, ...props }: FormControlProps, ref: any) => {
        const { error, formItemId } = useFormField();

        if (!children || !isValidElement(children)) {
            throw new Error(
                "Slot must have exactly one valid React element as a child."
            );
        }

        const childrenProps = children.props as any;

        const mergedProps = {
            ...childrenProps,
            ...props,
            className: cn(props.className, childrenProps.className, {
                "!outline-destructive !border-destructive": !!error,
            }),
            ref,
            id: formItemId,
        };

        return cloneElement(children, mergedProps);
    }
);

// FormItem is a container for form fields (e.g., label + input + error message)
// It generates a unique ID for accessibility
type FormItemProps = HTMLAttributes<HTMLDivElement>;
const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
    ({ className, ...props }, ref) => {
        const id = useId(); // Generate a unique ID for this form item

        return (
            <FormItemContext.Provider value={{ id }}>
                <div
                    ref={ref}
                    className={cn("space-y-2", className)} // Add spacing between elements
                    {...props}
                />
            </FormItemContext.Provider>
        );
    }
);
FormItem.displayName = "FormItem"; // Helpful for debugging in React DevTools

// FormLabel is a label for form inputs
// It connects to the input via the formItemId for accessibility
type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement>;
const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
    ({ className, children, ...props }, ref) => {
        const { formItemId, error } = useFormField(); // Get the input ID

        return (
            <label
                ref={ref}
                htmlFor={formItemId} // Links the label to the input
                className={cn("font-medium", className, {
                    "text-destructive": !!error,
                })}
                {...props}
            >
                {children}
            </label>
        );
    }
);
FormLabel.displayName = "FormLabel";

// FormMessage displays error messages or custom messages
// It shows the error from react-hook-form if there is one
type FormMessageProps = HTMLAttributes<HTMLParagraphElement>;
const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
    ({ className, children, ...props }, ref) => {
        const { error, formMessageId } = useFormField(); // Get error and message ID
        const message = error ? String(error.message) : children; // Use error or fallback to children

        if (!message) {
            return null; // Don't render if there's no message
        }

        return (
            <p
                ref={ref}
                id={formMessageId} // ID for accessibility
                className={cn("text-red-500", className)} // Style errors in red
                {...props}
            >
                {message}
            </p>
        );
    }
);
FormMessage.displayName = "FormMessage";

export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage };
