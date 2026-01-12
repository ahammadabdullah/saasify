import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import useSupabaseClient from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function SocialLogin({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  const loginWithProvider = async (
    provider: "google" | "twitter" | "linkedin_oidc"
  ) => {
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
        },
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
          onClick={() => loginWithProvider("linkedin_oidc")}
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
  );
}
