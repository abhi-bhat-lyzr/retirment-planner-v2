/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage from "./ChatMessage";
import { toast } from "sonner";
import {
  useSendMessageMutation,
  useLongPollMessageQuery,
} from "@/lib/features/api/api";
import {
  addMessage,
  setJobId,
  setIsTyping,
  clearJobId,
} from "@/lib/features/messages/messageSlice";

import { useAppSelector, useAppDispatch } from "@/lib/hook";
import { setInsights } from "@/lib/features/insights/insightsSlice";
import { updateUserInputs } from "@/lib/features/user/userSlice";
import { useUpdateInsightsMutation } from "@/lib/features/insights/insightsAPI";
import { useUpdateUserMutation } from "@/lib/features/user/userAPI";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

const ChatInterface = () => {
  const dispatch = useAppDispatch();
  const { messages, isTyping, currentJobId, sessionId } = useAppSelector(
    (state) => state.message
  );

  const { user_inputs } = useAppSelector((state) => state.user);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [sendMessage] = useSendMessageMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user message to the chat
    dispatch(
      addMessage({
        text: input,
        isUser: true,
        timestamp,
      })
    );

    // Clear input and show typing indicator
    setInput("");
    dispatch(setIsTyping(true));

    try {
      // Send message to API
      const response = await sendMessage({
        sessionId: sessionId,
        message: input,
        user_inputs: user_inputs,
      }).unwrap();

      // Store the job ID in Redux store
      if (response.jobId) {
        dispatch(setJobId(response.jobId));
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
      dispatch(setIsTyping(false));
    }
  };

  const { data: messageData } = useLongPollMessageQuery(currentJobId, {
    skip: !currentJobId || currentJobId == null,
    pollingInterval: 3000,
  });

  const [updateInsights] = useUpdateInsightsMutation();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    const handleInsightsUpdate = async (insights: any) => {
      try {
        const response = await updateInsights(insights).unwrap();
        console.log("response", response);
      } catch (error) {
        console.error("Failed to update insights:", error);
        toast.error("Failed to update insights");
      }
    };

    const handleUserUpdate = async (user: any) => {
      try {
        const response = await updateUser(user).unwrap();
        console.log("response", response);
      } catch (error) {
        console.error("Failed to update user:", error);
        toast.error("Failed to update user");
      }
    };

    if (messageData && messageData.status === "completed") {
      const response = messageData.results[0].response;
      const data = JSON.parse(response);

      console.log("data", data);

      dispatch(
        addMessage({
          isUser: false,
          text: data.message,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        })
      );

      if (data.tool_call_output) {
        dispatch(setInsights(data.tool_call_output));
        handleInsightsUpdate(data.tool_call_output);
      }

      if (data.user_inputs) {
        dispatch(updateUserInputs(data.user_inputs));
        handleUserUpdate(data.user_inputs);
      }

      dispatch(setIsTyping(false));
      dispatch(clearJobId());
    } else if (messageData && messageData.status === "failed") {
      toast.error("Failed to send message");
      dispatch(setIsTyping(false));
      dispatch(clearJobId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageData, dispatch]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-muted/50 border-b shrink-0">
        <h2 className="text-xl font-bold">Chat with Lyzr Assistant</h2>
        <p className="text-sm text-muted-foreground">
          Ask questions about retirement planning
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-4">
          {messages.map((message: Message, index: number) => (
            <ChatMessage
              key={index}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          {isTyping && (
            <div className="assistant-message chat-message animate-pulse">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="px-4 py-4 pb-14 border-t bg-background shrink-0">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about retirement planning..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            className="flex-grow"
          />
          <Button onClick={handleSendMessage} disabled={isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
