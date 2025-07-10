import { useAuth } from "@/context/AuthContext";
import { RiRobot3Line } from "react-icons/ri";
import { cn } from "../../../../lib/utils";
import AiResponse from "./AiResponse";
import { useAIChat } from "./ChatContext";
import UserMessage from "./UserMessage";

type Props = {
    className?: string;
};

const ChatConversation = ({ className }: Props) => {
    const { messages } = useAIChat();
    const { user } = useAuth();
    return (
        <div
            className={cn(
                "w-[90%] p-5 h-auto overflow-y-scroll hidden-scroll mx-auto space-y-5",
                className
            )}
        >
            {messages.length <= 0 && (
                <div className="size-full   flex flex-col gap-5 justify-center items-center">
                    <div className="flex items-center justify-start gap-2">
                        <div className="size-[60px] rounded-xl bg-green-500 flex justify-center items-center text-white">
                            <RiRobot3Line size={30}></RiRobot3Line>
                        </div>
                        <p className="font-semibold text-xl"> Trợ giảng AI</p>
                    </div>
                    <h3 className="text-xl">
                        <span className="font-semibold">
                            Xin chào {user?.fullName}
                        </span>
                        , Hôm nay của bạn thế nào?
                    </h3>
                </div>
            )}

            {messages.length > 0 &&
                messages.map((message, index) => {
                    if (message.sender === "user") {
                        return (
                            <UserMessage
                                key={index}
                                message={message}
                            ></UserMessage>
                        );
                    }

                    if (
                        index <= 0 ||
                        !message.userMessageId ||
                        messages[index - 1].id !== message.userMessageId
                    ) {
                        return (
                            <div className="text-destructive font-semibold">
                                Đã có lỗi xảy ra, vui lòng thử lại sau
                            </div>
                        );
                    }

                    return (
                        <AiResponse
                            message={message}
                            userMessage={messages[index - 1]}
                            key={index}
                        ></AiResponse>
                    );
                })}
            {messages.length > 0 && <div className="min-h-[300px]"></div>}
        </div>
    );
};

export default ChatConversation;
