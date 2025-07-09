import type { Message } from "./ChatContext";

type Props = { message: Message };

const UserMessage = ({ message }: Props) => {
    return (
        <div className="w-full flex justify-end items-center">
            <div className="px-5 py-2 rounded-xl bg-slate-200">
                {message.content}
            </div>
        </div>
    );
};

export default UserMessage;
