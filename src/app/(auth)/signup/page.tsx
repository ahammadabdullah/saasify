"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { CreateUserInput, createUserSchema } from "@/lib/user-schema";
import useSupabaseClient from "@/lib/supabase/client";
import { signUpWithEmailAndPassword } from "@/app/_action";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const supabase = useSupabaseClient();

  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<CreateUserInput> = async (values) => {
    setIsLoading(true);
    startTransition(async () => {
      const res = await signUpWithEmailAndPassword({
        data: values,
        emailRedirectTo: `${location.origin}/auth/callback`,
      });
      if (!res.success) {
        toast({
          title: "Error",
          description: res?.error?.message,
          variant: "destructive",
        });
        reset({ password: "" });
        return;
      }
      toast({ title: "Success", description: "Successfully Signed Up" });
      setIsLoading(false);
      router.push("/signin");
    });
  };
  const loginWithProvider = async (
    provider: "google" | "twitter" | "linkedin"
  ) => {
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${location.origin}/auth/callback` },
      });
    } catch (error: any) {
      toast({
        title: "OAuth Error",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <AuthForm
      title="Create an account"
      footer={
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            type="text"
            autoCapitalize="words"
            {...register("name")}
            disabled={isLoading}
          />
          {errors["name"] && (
            <span className="text-red-500 text-xs pt-1 block">
              {errors["name"]?.message as string}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="m@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            {...register("email")}
            disabled={isLoading}
          />
          {errors["email"] && (
            <span className="text-red-500 text-xs pt-1 block">
              {errors["email"]?.message as string}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            disabled={isLoading}
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
            disabled={isLoading}
          />
          {errors["passwordConfirm"] && (
            <span className="text-red-500 text-xs pt-1 block">
              {errors["passwordConfirm"]?.message as string}
            </span>
          )}
        </div>
        <Button
          className="w-full"
          type="submit"
          disabled={isLoading || isPending}
        >
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Loading..." : "Sign Up"}
        </Button>
      </form>
      <div className="mt-6">
        <Separator className="my-4" />
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() => loginWithProvider("google")}
            disabled={isLoading}
          >
            <Icons.google className="h-5 w-5" />
            <span className="sr-only">Sign In with Google</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => loginWithProvider("linkedin")}
            disabled={isLoading}
          >
            <Icons.linkedin className="h-5 w-5" />
            <span className="sr-only">Sign In with LinkedIn</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => loginWithProvider("twitter")}
            disabled={isLoading}
          >
            <Icons.twitter className="h-5 w-5" />
            <span className="sr-only">Sign In with Twitter</span>
          </Button>
        </div>
      </div>
    </AuthForm>
  );
}
