"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetUser from "@/hooks/use-getUser";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function PayNowBanner({
  currentDue = 0,
}: {
  currentDue: number | undefined;
}) {
  const [loading, setLoading] = useState(false);
  const [user] = useGetUser();
  const router = useRouter();
  const handleEarlyPayment = async (variantId: string) => {
    setLoading(true);
    const body = {
      price: currentDue,
      product_name: "Early Payment",
      user_id: user?.id,
      variant_id: variantId,
    };
    try {
      const res = await fetch("/api/v1/lemon/checkout", {
        body: JSON.stringify(body),
        method: "POST",
      });
      const data = await res.json();
      console.log("data from custom checkout", data);
      if (data.attributes.url) {
        router.push(data.attributes.url);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      {currentDue > 0 ? (
        <>
          <CardHeader>
            <CardTitle>Outstanding Balance</CardTitle>
            <CardDescription>
              Complete your payment to stay up to date.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <p className="text-2xl font-bold mb-4">${currentDue}</p>
            <Button className="w-full">Make Payment</Button>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle>All Clear!</CardTitle>
            <CardDescription>
              You have no outstanding payments at the moment.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <p className="text-2xl font-bold mb-4">$0</p>

            <Button
              onClick={() => handleEarlyPayment("672511")}
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <span>
                  <Loader className="animate-spin" />
                </span>
              ) : (
                "Early Payment"
              )}
            </Button>
          </CardContent>
        </>
      )}
    </Card>
  );
}
