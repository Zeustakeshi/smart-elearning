import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AuthFormCombinedProps } from "@/types/auth";

export function AuthForm({
  form,
  onSubmit,
  title,
  description,
  children,
  submitButtonText,
  footerContent,
  ...props
}: AuthFormCombinedProps) {
  const { isSubmitting } = form.formState;

  return (
    <div className={cn("flex flex-col gap-6", props.className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {children}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Đang xử lý..." : submitButtonText}
              </Button>
              {footerContent}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
