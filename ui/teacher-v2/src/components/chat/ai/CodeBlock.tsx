import type { CodeToHtmlOptions } from "@llm-ui/code";
import {
    allLangs,
    allLangsAlias,
    loadHighlighter,
    useCodeBlockToHtml,
} from "@llm-ui/code";
// WARNING: Importing bundledThemes increases your bundle size
// see: https://llm-ui.com/docs/blocks/code#bundle-size
import { type LLMOutputComponent } from "@llm-ui/react";
import parseHtml from "html-react-parser";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { getHighlighterCore } from "shiki/core";
import { bundledLanguagesInfo } from "shiki/langs";
import { bundledThemes } from "shiki/themes";
import getWasm from "shiki/wasm";
import Button from "../../ui/Button";

const highlighter = loadHighlighter(
    getHighlighterCore({
        langs: allLangs(bundledLanguagesInfo),
        langAlias: allLangsAlias(bundledLanguagesInfo),
        themes: Object.values(bundledThemes),
        loadWasm: getWasm,
    })
);

const codeToHtmlOptions: CodeToHtmlOptions = {
    theme: "github-dark",
};

const CodeBlock: LLMOutputComponent = ({ blockMatch }) => {
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCopied(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [copied]);

    const { html, code } = useCodeBlockToHtml({
        markdownCodeBlock: blockMatch.output,
        highlighter,
        codeToHtmlOptions,
    });
    // Add custom padding to the code block

    if (!html) {
        // fallback to <pre> if Shiki is not loaded yet
        return (
            <pre className="shiki">
                <code>{code}</code>
            </pre>
        );
    }
    return (
        <div className="my-2">
            <div className="flex w-full mb-1 justify-start">
                <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
                    <Button
                        className="!p-1 !px-2 rounded-full text-[12px] font-semibold"
                        variant="outline"
                    >
                        {copied ? "Đã sao chép" : "Sao chép"}
                    </Button>
                </CopyToClipboard>
            </div>
            {parseHtml(html)}
        </div>
    );
};

export default CodeBlock;
