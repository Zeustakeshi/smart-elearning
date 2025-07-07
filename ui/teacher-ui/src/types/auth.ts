import type { UseFormReturn } from "react-hook-form";

export interface AuthFormProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  submitButtonText: string;
  footerContent: React.ReactNode;
}

//Tách prop "onSubmit" có sẵn của thẻ div
export type AuthFormCombinedProps = AuthFormProps &
  Omit<React.ComponentProps<"div">, "onSubmit">;

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  type: "STUDENT" | "TEACHER";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}
