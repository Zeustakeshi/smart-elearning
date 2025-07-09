import {
    codeBlockLookBack,
    findCompleteCodeBlock,
    findPartialCodeBlock,
} from "@llm-ui/code";
import { markdownLookBack } from "@llm-ui/markdown";
import { useLLMOutput, useStreamExample } from "@llm-ui/react";
import { useEffect, useRef } from "react";
import { RiRobot3Line } from "react-icons/ri";
import CodeBlock from "../../../../components/chat/ai/CodeBlock";
import MarkdownBlock from "../../../../components/chat/ai/MarkdownBlock";
import { useAIChat, type Message } from "./ChatContext";

type Props = {
    message: Message;
    userMessage: Message;
};

const example = `##
Chào bạn đây là câu trả lời cho bạn
\`\`\`python
print("xin chào")
for i in range(0, 10):
    print("hello word") # this line will print 10 time
\`\`\`
`;

const AiResponse = ({}: Props) => {
    const { isStreamFinished, output } = useStreamExample(example);
    const { setIsLoading } = useAIChat();

    const messagesRef = useRef<HTMLDivElement>(null);

    const { blockMatches } = useLLMOutput({
        llmOutput: output,
        fallbackBlock: {
            component: MarkdownBlock,
            lookBack: markdownLookBack(),
        },
        blocks: [
            {
                component: CodeBlock,
                findCompleteMatch: findCompleteCodeBlock(),
                findPartialMatch: findPartialCodeBlock(),
                lookBack: codeBlockLookBack(),
            },
        ],
        isStreamFinished,
    });

    useEffect(() => {
        if (!isStreamFinished) return;
        setIsLoading(false);
    }, [isStreamFinished]);

    useEffect(() => {
        messagesRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    return (
        <div ref={messagesRef}>
            <div className="flex items-center justify-start gap-2">
                <div className="size-[40px] rounded-xl bg-green-500 flex justify-center items-center text-white">
                    <RiRobot3Line size={24}></RiRobot3Line>
                </div>
                <p className="font-semibold"> Trợ giảng AI</p>
            </div>
            <div className="mt-5">
                {blockMatches.map((blockMatch, index) => {
                    const Component = blockMatch.block.component;
                    return <Component key={index} blockMatch={blockMatch} />;
                })}
            </div>
        </div>
    );
};

export default AiResponse;
