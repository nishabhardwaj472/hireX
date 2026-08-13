import { LuTrash2, LuCalendar, LuBrainCircuit, LuArrowRight, LuBookOpen } from "react-icons/lu";
import { getInitials } from "../../Util/helper.js";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="group relative bg-white border border-gray-200 rounded-[1.5rem] overflow-hidden cursor-pointer transition-all duration-400 hover:border-gray-300 hover:shadow-xl hover:-translate-y-0.5"
      onClick={onSelect}
    >
      {/* Hover orange glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF9324]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.5rem]" />

      {/* Top colour band */}
      <div
        className="relative h-24 overflow-hidden"
        style={{ background: colors.bgcolor }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-300" />

        {/* Role initials + title */}
        <div className="absolute inset-0 flex items-center gap-4 px-5 z-10">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform duration-400">
            <span className="text-xl font-black text-white tracking-tight drop-shadow-md">
              {getInitials(role)}
            </span>
          </div>
          <div className="flex-grow min-w-0">
            <h2 className="text-base font-bold text-white leading-tight truncate group-hover:text-orange-200 transition-colors duration-300">
              {role}
            </h2>
            <div className="flex items-center gap-1.5 mt-1.5 opacity-70">
              <LuBrainCircuit size={11} className="text-[#FF9324] shrink-0" />
              <p className="text-[10px] font-semibold text-white/80 uppercase tracking-[0.12em] truncate">
                {topicsToFocus}
              </p>
            </div>
          </div>
        </div>

        {/* Delete button */}
        <button
          className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center text-white/30 hover:text-rose-400 hover:bg-rose-500/15 rounded-xl transition-all duration-200 border border-transparent hover:border-rose-500/20"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          title="Delete session"
        >
          <LuTrash2 size={15} />
        </button>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[10px] font-bold text-gray-500 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg tracking-widest uppercase">
            {experience} {Number(experience) === 1 ? "Year" : "Years"} Exp
          </span>
          <span className="text-[10px] font-bold text-[#FF9324] px-2.5 py-1 bg-[#FF9324]/[0.08] border border-[#FF9324]/20 rounded-lg tracking-widest uppercase flex items-center gap-1.5">
            <LuBookOpen size={10} />
            {questions} Q&A
          </span>
        </div>

        {/* Description */}
        <p className="text-[13px] text-gray-500 leading-[1.65] line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
          {description || `Personalized roadmap tailored for ${role} preparation.`}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-400">
            <LuCalendar size={11} />
            <span className="text-[10px] font-semibold uppercase tracking-widest">
              {lastUpdated}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[#FF9324] text-[11px] font-bold opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-400 uppercase tracking-tight">
            Start Prep <LuArrowRight size={13} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;