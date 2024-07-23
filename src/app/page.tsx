"use client";

import { useChat } from "ai/react";
import { ArrowUp } from "lucide-react";
import { useCallback, useRef } from "react";

import { ExpandableTextarea } from "@/components/atoms/ExpandableTextarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const formRef = useRef<HTMLFormElement>(null);

  // Dispatch certain keys to command input
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Add a new line
      } else {
        // Submit the form
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    }
  }, []);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <div className="sticky top-0 z-10 flex h-14 items-center">Header</div>

      <div className="flex w-full flex-1 overflow-y-scroll">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
          <div className="mx:px-6 flex w-full flex-1 flex-col px-4 py-24">
            {messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap">
                {m.role === "user" ? "User: " : "AI: "}
                {m.content}
              </div>
            ))}
          </div>
          <div className="sticky bottom-0 w-full pt-6">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mb-4 flex w-full flex-col gap-4"
            >
              <div className="group relative flex w-full items-center">
                <ExpandableTextarea
                  className="rounded-[30px] px-6 py-4 pr-28 text-lg"
                  value={input}
                  placeholder="Hello, Llama"
                  autoComplete="off"
                  autoCorrect="off"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute right-0 mx-4">
                  <Button
                    type="submit"
                    className={cn(
                      "rounded-full bg-gray-400 px-2.5 opacity-50 transition duration-300 group-hover:opacity-100",
                      input && "bg-primary",
                    )}
                  >
                    <ArrowUp className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="mx-auto text-xs text-muted-foreground">
                {input.length > 3 ? (
                  <>
                    Use{" "}
                    <span className="rounded-md bg-slate-100 p-1">shift + return</span>{" "}
                    for a new line
                  </>
                ) : (
                  "Built with..."
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
