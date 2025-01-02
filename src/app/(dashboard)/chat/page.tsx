import { ChatPageSkeleton } from "@/components/Skeletons/chat-page-skeleton";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Chat = dynamic(
  () => import("@/components/chat/Chat").then((mod) => mod.default),
  { loading: () => <ChatPageSkeleton />, ssr: false }
);

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatPageSkeleton />}>
      <Chat />
    </Suspense>
  );
}
