/* eslint-disable no-unused-vars */
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import reactGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

const AiResponsePreviewer = ({ content }) => {
  if (!content) return null;

  const CodeBlock = ({ code, language }) => {
    const [copied, setCopied] = useState(false);
    const copyCode = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative my-6 rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30 border border-rose-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/30 border border-green-500/50" />
            </div>
            <LuCode className="text-[#FF9324]" size={13} />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em]">
              {language || "code"}
            </span>
          </div>
          <button
            onClick={copyCode}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-all"
            title="Copy code"
          >
            {copied
              ? <LuCheck size={14} className="text-emerald-400" />
              : <LuCopy size={14} />
            }
          </button>
        </div>
        <SyntaxHighlighter
          language={language || "javascript"}
          style={vscDarkPlus}
          customStyle={{
            fontSize: "13px",
            lineHeight: "1.65",
            margin: 0,
            padding: "1.25rem 1.5rem",
            background: "transparent",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  };

  return (
    <div className="max-w-none selection:bg-orange-500/20">
      <ReactMarkdown
        remarkPlugins={[reactGfm]}
        components={{
          p: ({ children }) => (
            <p className="text-gray-600 text-[14.5px] leading-[1.8] mb-5">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="text-gray-900 font-semibold">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="pl-5 space-y-2.5 mb-5 list-none">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="pl-5 space-y-2.5 mb-5 list-decimal marker:text-[#FF9324]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-600 text-[14px] leading-relaxed flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9324]/60 shrink-0 mt-[7px]" />
              <span>{children}</span>
            </li>
          ),
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-gray-900 mt-8 mb-4 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold text-gray-900 mt-7 mb-3 tracking-tight pb-2 border-b border-gray-200">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-[#FF9324] mt-5 mb-2.5">
              {children}
            </h3>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[#FF9324]/40 pl-4 my-5 text-gray-500 italic text-[14px]">
              {children}
            </blockquote>
          ),
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !className ? (
              <code
                className="px-1.5 py-0.5 bg-[#FF9324]/10 border border-[#FF9324]/20 rounded-md text-[#FFB562] font-mono text-[12.5px] font-medium"
                {...props}
              >
                {children}
              </code>
            ) : (
              <CodeBlock
                code={String(children).replace(/\n$/, "")}
                language={match ? match[1] : ""}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AiResponsePreviewer;