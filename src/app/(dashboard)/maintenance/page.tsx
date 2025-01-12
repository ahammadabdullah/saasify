"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Lottie from "lottie-react";
import maintenanceData from "../../../assets/maintenance.json";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-70px)] bg-background">
      <div>
        <Lottie
          animationData={maintenanceData}
          loop={true}
          className="w-80 lg:w-[450px]"
        />
      </div>
      <p className="text-xl text-muted-foreground mb-8">
        We&apos;ll be back soon!
      </p>
      <div className="max-w-md text-center mb-8">
        <p className="text-muted-foreground">
          Our website is currently undergoing scheduled maintenance. Thank you
          for your understanding and patience.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
