"use client";
import { cn } from "@/lib/utils";
import MarkdownViewer from "../ui/MarkdownViewer";

type ChatMessageProps = {
  message: string;
  isUser: boolean;
  timestamp?: string;
};

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "chat-message mb-4 animate-fade-in",
        isUser ? "items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "flex items-start gap-2 w-full",
          isUser ? "justify-end" : "justify-start"
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-1 max-w-[80%]",
            isUser ? "items-end" : "items-start"
          )}
        >
          <div
            className={cn(
              "rounded-lg px-4 py-2",
              isUser
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground"
            )}
          >
            <MarkdownViewer
              content={message}
              className={cn(
                "!mt-0 !mb-0",
                isUser ? "text-primary-foreground" : "text-foreground",
                "[&_p]:!mt-0 [&_p]:!mb-0",
                "[&_ul]:!mt-0 [&_ul]:!mb-0",
                "[&_ol]:!mt-0 [&_ol]:!mb-0",
                "[&_blockquote]:!mt-0 [&_blockquote]:!mb-0",
                "[&_pre]:!mt-0 [&_pre]:!mb-0",
                "[&_code]:bg-primary-foreground/10"
              )}
            />
          </div>
          <span
            className={cn(
              "text-xs text-muted-foreground px-2",
              isUser ? "text-right" : "text-left"
            )}
          >
            {isUser ? "You" : "Assistant"} • {timestamp || "Just now"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
