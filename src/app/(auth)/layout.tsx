import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      <div className="hidden lg:flex lg:w-1/2 bg-foreground items-center justify-center p-12">
        <div className="max-w-md text-center text-background">
          <h1 className="text-4xl font-bold mb-6">SaaSify</h1>
          <p className="text-xl ">
            Streamline your workflow with our powerful AI tools.
          </p>
        </div>
      </div>
      <div className="lg:hidden text-center p-4 mt-5">
        <h1 className="text-2xl font-bold">SaaSify</h1>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
