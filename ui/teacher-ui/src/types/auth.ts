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
  role: "STUDENT" | "TEACHER";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
export interface DecodedToken {
  sub: number;
  user_id: number;
  username: string;
  email: string;
  scope: string;
  exp: number;
  iat: number;
}
