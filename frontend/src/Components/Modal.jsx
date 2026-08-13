import { LuX } from "react-icons/lu";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent" />

        {!hideHeader && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900 tracking-tight">{title}</h3>
          </div>
        )}

        {/* Close button */}
        <button
          type="button"
          className="absolute top-3.5 right-3.5 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all z-10 cursor-pointer"
          onClick={onClose}
          aria-label="Close modal"
        >
          <LuX size={16} />
        </button>

        <div className="flex flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
