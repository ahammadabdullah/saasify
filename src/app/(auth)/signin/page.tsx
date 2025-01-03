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

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 3000);
  }

  return (
    <AuthForm
      title="Sign in to your account"
      footer={
        <p className="text-sm text-muted-foreground">
          Don@apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="m@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" disabled={isLoading} />
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>
      <div className="mt-6">
        <Separator className="my-4" />
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" onClick={() => {}} disabled={isLoading}>
            <Icons.google className="h-5 w-5" />
            <span className="sr-only">Sign In with Google</span>
          </Button>
          <Button variant="outline" onClick={() => {}} disabled={isLoading}>
            <Icons.linkedin className="h-5 w-5" />
            <span className="sr-only">Sign In with LinkedIn</span>
          </Button>
          <Button variant="outline" onClick={() => {}} disabled={isLoading}>
            <Icons.twitter className="h-5 w-5" />
            <span className="sr-only">Sign In with Twitter</span>
          </Button>
        </div>
      </div>
    </AuthForm>
  );
}
