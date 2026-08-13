import { useEffect } from "react";
import { LuX, LuSparkles } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 z-40 h-screen transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          bg-white border-l border-gray-200
          w-full md:w-[48vw] lg:w-[38vw]
          shadow-2xl
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        tabIndex="-1"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#FF9324]/10 border border-[#FF9324]/20 flex items-center justify-center shrink-0">
              <LuSparkles size={15} className="text-[#FF9324]" />
            </div>
            <h5
              id="drawer-right-label"
              className="text-sm font-bold text-gray-900 tracking-tight truncate"
            >
              {title || "AI Explanation"}
            </h5>
          </div>
          <button
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-all shrink-0 ml-3 cursor-pointer"
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <LuX size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-65px)] overflow-y-auto custom-scrollbar">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;