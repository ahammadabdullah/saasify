"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  const user = false;
  const router = useRouter();
  if (user) {
    router.push("/home");
  } else router.push("/login");
  return null;
}
