import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-6xl font-bold text-primary mb-4">
        Authentication Error
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Oops! Something went wrong during authentication.
      </p>
      <div className="max-w-md text-center mb-8">
        <p className="text-muted-foreground">
          There was an issue with your authentication request. Please try again
          or contact support if the problem persists.
        </p>
      </div>
      <Button asChild>
        <Link href="/signin">Go to Login</Link>
      </Button>
    </div>
  );
}
