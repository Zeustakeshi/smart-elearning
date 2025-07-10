import { RiGlobalLine } from "react-icons/ri";
import Button from "../../../../components/ui/Button";
import TextArea from "../../../../components/ui/Textarea";
import { cn } from "../../../../lib/utils";

import { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import ButtonUploadFile from "./ButtonUploadFile";
import { useAIChat } from "./ChatContext";
type Props = {
    className?: string;
};

const ChatInput = ({ className }: Props) => {
    const [message, setMessage] = useState<string>("");

    const { sendMessage, isLoading } = useAIChat();

    const handleKeyDown = async (e: any) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSendMessage = async () => {
        if (message.trim() == "" || isLoading) return;
        await sendMessage(message);
        setMessage("");
    };

    return (
        <div
            className={cn(
                "w-[80%] border border-foreground rounded-xl p-5 bg-white",
                className
            )}
        >
            <TextArea
                autoFocus
                maxLength={5000}
                placeholder="Hôm nay tôi có thể giúp gì cho bạn?"
                className="!border-none !outline-none !shadow-none max-h-[200px]  text-[16px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            ></TextArea>
            <div className="flex w-full justify-between items-center mt-1">
                <div className="flex justify-start gap-2 items-center">
                    <ButtonUploadFile></ButtonUploadFile>

                    <Button className="!p-2 rounded-full" variant="outline">
                        <RiGlobalLine></RiGlobalLine>
                    </Button>
                </div>
                <Button
                    disabled={isLoading || !message.trim()}
                    onClick={handleSendMessage}
                    className="!p-2 rounded-full"
                >
                    <FaArrowCircleUp size={20}></FaArrowCircleUp>
                </Button>
            </div>
        </div>
    );
};

export default ChatInput;
