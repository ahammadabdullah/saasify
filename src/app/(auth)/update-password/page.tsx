"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePassword } from "@/app/_action";
import { updatePasswordSchema } from "@/lib/user-schema";
import { z } from "zod";

type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;

export default function UpdatePasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });
  const onSubmit: SubmitHandler<UpdatePasswordSchema> = async (data) => {
    try {
      const res = await updatePassword({ password: data.password });
      if (!res.success) {
        toast({
          title: "Error",
          description: res?.error?.message,
          variant: "destructive",
        });
        reset({ password: "" });
        reset({ passwordConfirm: "" });
        return;
      }
      toast({
        title: "Success",
        description: "Password updated successfully",
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            disabled={isSubmitting}
          />
          {errors["password"] && (
            <span className="text-red-500 text-xs pt-1 block">
              {errors["password"]?.message as string}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("passwordConfirm")}
            disabled={isSubmitting}
          />
          {errors["passwordConfirm"] && (
            <span className="text-red-500 text-xs pt-1 block">
              {errors["passwordConfirm"]?.message as string}
            </span>
          )}
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Update Password
        </Button>
      </form>
    </AuthForm>
  );
}
