"use client";

import React, { useEffect, useRef, useState } from "react";
import { Message } from "@/components/message";
import { useScrollToBottom } from "@/components/use-scroll-to-bottom";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { SendHorizontal } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { getUserById } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import Welcome from "@/components/Welcome";
import Toaster from "@/components/Toaster";

export default function Home() {
  const { userId } = useAuth();
  const { messages, handleSubmit, input, setInput, isLoading } = useChat();
  const [currentPersonality, setCurrentPersonality] = useState<
    string | undefined
  >(undefined);

  const router = useRouter();

  const [userData, setUserData] = useState<any>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const [isClient, setIsClient] = useState(false);
  const [toast, setToast] = useState(false);

  // Check if the component is mounted on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId && !userData) {
        try {
          const response = await getUserById({ userId });
          const user = JSON.parse(response);
          setUserData(user);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUserData();
  }, [userId, userData]);

  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => {
        setToast(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  if (!userId && messages.length > 0) {
    router.push("/sign-in");
  }

  const handleUserSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId) {
      setToast(true);
      return;
    }

    setInput("");

    const personalityMatch = input.match(
      /(?:^|\s)(elon|steve|warren)(?=\s|$)/i
    );
    if (personalityMatch) {
      setCurrentPersonality(personalityMatch[1].toLowerCase());
    }

    handleSubmit(event);
  };

  return (
    <div className="flex h-[calc(100vh-56px)] w-full flex-row justify-center bg-dark-300 pb-24 pt-8">
      {toast && <Toaster />}
      <div className="flex flex-col justify-between gap-4 ">
        <div
          ref={messagesContainerRef}
          className="scrollbar-hide flex h-full w-dvw flex-col items-center gap-6 overflow-y-scroll"
        >
          {messages.length === 0 && <Welcome />}

          {messages.map((message) => {
            const personalityMatch = message.content.match(/^\[(.*?)\]/);
            const personality = personalityMatch
              ? personalityMatch[1].toLowerCase()
              : undefined;
            const contentWithoutPersonality = personalityMatch
              ? message.content.replace(/^\[(.*?)\]\s*/, "")
              : message.content;

            return (
              <Message
                key={message.id}
                role={message.role}
                content={contentWithoutPersonality}
                personality={personality}
                picture={JSON.stringify(userData?.picture || null)}
              />
            );
          })}

          {isLoading && !messages.some((msg) => msg.role === "assistant") && (
            <Message
              role="assistant"
              content="typing..."
              personality={currentPersonality}
            />
          )}
          <div ref={messagesEndRef} />
        </div>

        {isClient && (
          <div className="fixed inset-x-0 bottom-0 w-full pb-4 sm:bottom-0 sm:pb-10">
            <div className="mx-auto px-4 sm:max-w-3xl">
              <form onSubmit={handleUserSubmit} action="">
                <div className="relative flex max-h-52 w-full grow flex-col">
                  <TextareaAutosize
                    ref={inputRef}
                    tabIndex={0}
                    onKeyDown={(
                      e: React.KeyboardEvent<HTMLTextAreaElement>
                    ) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        handleUserSubmit(e);
                      }
                    }}
                    placeholder="Send a message"
                    className="min-h-[40px] w-full resize-none overflow-hidden rounded-xl border border-zinc-700 bg-dark-400 py-4 pl-6 pr-16 text-[16px] text-white placeholder:text-light-500 focus-within:outline-none"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <div className="absolute bottom-2.5 right-2.5">
                    <Button
                      type="submit"
                      size="icon"
                      disabled={input.length === 0}
                      className="rounded-[6px] bg-purple-gradient shadow-purple-glow"
                    >
                      <SendHorizontal className="size-6 text-white" />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
