"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import useSupabaseClient from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resetPassword } from "@/app/_action";
import { resetPasswordSchema } from "@/lib/user-schema";

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export default function SignInPage() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = async (data) => {
    try {
      const res = await resetPassword(data.email);
      if (!res.success) {
        toast({
          title: "Error",
          description: res?.error?.message,
          variant: "destructive",
        });
        reset({ email: "" });
        return;
      }
      toast({
        title: "Success",
        description: "A link has been sent to reset your password",
      });
      router.push("/signin");
    } catch (err) {
      toast({
        title: "Unexpected error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthForm
      title="Reset your password"
      footer={
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            {...register("email")}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Send Link
        </Button>
      </form>
    </AuthForm>
  );
}
