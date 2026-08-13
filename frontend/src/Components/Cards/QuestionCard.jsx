import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AiResponsePreviewer from "../AiResponsePreviewer";

const QuestionCard = ({ question, answer, onLearnMore, isPinned, onTogglePin, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    setHeight(isExpanded ? contentRef.current.scrollHeight + 24 : 0);
  }, [isExpanded]);

  return (
    <div
      className={`group mb-4 transition-all duration-400 rounded-[1.25rem] border
        ${isExpanded
          ? "bg-white border-gray-300 shadow-xl"
          : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
        }`}
    >
      {/* Header (click to expand) */}
      <div
        className="px-5 py-4 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          {/* Question number + text */}
          <div className="flex items-start gap-4 min-w-0">
            <div
              className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs transition-all duration-300
                ${isExpanded
                  ? "bg-[#FF9324] text-white shadow-[0_0_12px_rgba(255,147,36,0.3)]"
                  : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}
            >
              {index !== undefined ? index + 1 : "Q"}
            </div>
            <h3
              className={`text-sm md:text-[15px] font-semibold leading-[1.6] tracking-tight transition-colors duration-300 min-w-0
                ${isExpanded ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"}`}
            >
              {question}
            </h3>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Pin */}
            <button
              onClick={(e) => { e.stopPropagation(); onTogglePin(); }}
              title={isPinned ? "Unpin" : "Pin question"}
              className={`w-8 h-8 flex items-center justify-center rounded-xl border transition-all duration-200
                ${isPinned
                  ? "bg-[#FF9324]/10 border-[#FF9324]/40 text-[#FF9324]"
                  : "bg-transparent border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
            >
              {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
            </button>

            {/* AI Explore */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
                onLearnMore();
              }}
              className="hidden md:flex items-center gap-2 bg-transparent border border-gray-200 hover:border-sky-400 hover:bg-sky-50 px-3 py-1.5 rounded-xl text-[10px] font-bold text-gray-500 hover:text-sky-600 transition-all duration-200 uppercase tracking-widest"
            >
              <LuSparkles size={12} /> AI
            </button>

            {/* Chevron */}
            <LuChevronDown
              className={`text-gray-400 transition-transform duration-400 ${isExpanded ? "rotate-180" : ""}`}
              size={18}
            />
          </div>
        </div>

        {/* Pinned indicator */}
        {isPinned && (
          <div className="flex items-center gap-1.5 mt-2 ml-11">
            <div className="w-1 h-1 rounded-full bg-[#FF9324]" />
            <span className="text-[9px] font-bold text-[#FF9324] uppercase tracking-widest">Pinned</span>
          </div>
        )}
      </div>

      {/* Expandable answer */}
      <div
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef} className="px-5 pb-6">
          <div className="h-px bg-gray-100 mb-5" />
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-[#FF9324] rounded-full" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                AI Generated Answer
              </span>
            </div>
            <AiResponsePreviewer content={answer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
