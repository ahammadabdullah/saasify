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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function SignInPage() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
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
      title="Sign in to your account"
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
      <div className="mt-6">
        <Separator className="my-4" />
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() => loginWithProvider("google")}
            disabled={isSubmitting}
          >
            <Icons.google className="h-5 w-5" />
            <span className="sr-only">Sign In with Google</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => loginWithProvider("linkedin")}
            disabled={isSubmitting}
          >
            <Icons.linkedin className="h-5 w-5" />
            <span className="sr-only">Sign In with LinkedIn</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => loginWithProvider("twitter")}
            disabled={isSubmitting}
          >
            <Icons.twitter className="h-5 w-5" />
            <span className="sr-only">Sign In with Twitter</span>
          </Button>
        </div>
      </div>
    </AuthForm>
  );
}
