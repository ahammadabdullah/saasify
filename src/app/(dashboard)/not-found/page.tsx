"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import notFoundData from "../../../assets/404.json";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-70px)] bg-background">
      <div>
        <Lottie
          animationData={notFoundData}
          loop={true}
          className=" w-80  lg:w-[400px]"
        />
      </div>
      <p className="text-xl text-muted-foreground mb-8">Oops! Page not found</p>
      <div className="max-w-md text-center mb-8">
        <p className="text-muted-foreground">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
