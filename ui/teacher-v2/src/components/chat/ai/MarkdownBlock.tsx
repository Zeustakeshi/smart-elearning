import { type LLMOutputComponent } from "@llm-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownBlock: LLMOutputComponent = ({ blockMatch }) => {
    const markdown = blockMatch.output;
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    );
};
export default MarkdownBlock;
