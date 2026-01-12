"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import useSupabaseClient from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmailAndPassword } from "@/app/_action";
import { loginUserSchema } from "@/lib/user-schema";
import SocialLogin from "@/components/auth/social-login";

type LoginSchema = z.infer<typeof loginUserSchema>;

export default function SignInPage() {
  const router = useRouter();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      const res = await signInWithEmailAndPassword(data);

      if (!res.success) {
        toast({
          title: "Error",
          description: res?.error?.message,
          variant: "destructive",
        });
        reset({ password: "" });
        return;
      }
      toast({ title: "Success", description: "Successfully logged in" });
      router.push("/home");
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
      title="Sign in to your account"
      footer={
        <div>
          <p className="text-sm text-muted-foreground text-center">
            <Link
              href="/reset-password"
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
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
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign In
        </Button>
      </form>
      <div className="my-4 rounded-md border bg-muted/40 p-4 text-sm">
        <p className="mb-2 font-medium">Test Credentials</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Email:</span>
            <code className="rounded bg-muted px-1 py-0.5">
              alcahammad@gmail.com
            </code>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={() =>
                navigator.clipboard.writeText("alcahammad@gmail.com")
              }
            >
              Copy
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Password:</span>
            <code className="rounded bg-muted px-1 py-0.5">12345678</code>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={() => navigator.clipboard.writeText("12345678")}
            >
              Copy
            </Button>
          </div>
        </div>
      </div>
      <SocialLogin isSubmitting={isSubmitting} />
    </AuthForm>
  );
}
