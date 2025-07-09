import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";

// Types
export type Message = {
    id: string;
    sender: "user" | "ai";
    content: string;
    timestamp: number;
    userMessageId?: string;
};

export type ChatContextProps = {
    messages: Message[];
    sendMessage: (content: string) => Promise<void>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ChatContext = createContext<ChatContextProps | undefined>(
    undefined
);

// Provider
type ChatProviderProps = {
    children: ReactNode;
};

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async (content: string) => {
        const userMessageId = `${Date.now()}-user`;
        const userMsg: Message = {
            id: userMessageId,
            sender: "user",
            content,
            timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setIsLoading(true);

        const aiMsg: Message = {
            id: `${Date.now()}-ai`,
            sender: "ai",
            content: `AI response to: ${content}`,
            timestamp: Date.now(),
            userMessageId,
        };
        setMessages((prev) => [...prev, aiMsg]);
    };

    return (
        <ChatContext.Provider
            value={{
                messages,
                sendMessage,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useAIChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useAIChat must be used within a ChatProvider");
    }
    return context;
};
