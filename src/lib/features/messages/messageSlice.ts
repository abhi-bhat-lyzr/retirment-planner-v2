import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface MessageState {
  messages: Message[];
  currentJobId: string | null;
  isTyping: boolean;
  sessionId: string;
}

const initialState: MessageState = {
  messages: [
    {
      text: "Hello, I'm your retirement planning assistant. I'm here to help you plan for a secure financial future. What would you like to know about retirement planning?",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ],
  currentJobId: null,
  isTyping: false,
  sessionId: uuidv4(),
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setJobId: (state, action: PayloadAction<string>) => {
      state.currentJobId = action.payload;
    },
    setIsTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    clearJobId: (state) => {
      state.currentJobId = null;
    },
  },
});

export const { addMessage, setJobId, setIsTyping, clearJobId } =
  messageSlice.actions;
export default messageSlice.reducer;
