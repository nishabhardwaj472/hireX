import { LuTriangleAlert } from "react-icons/lu";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-6 w-full md:w-[400px]">
      {/* Warning icon */}
      <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-5">
        <LuTriangleAlert size={22} className="text-rose-400" />
      </div>

      <h4 className="text-base font-bold text-gray-900 mb-2 tracking-tight">
        Delete Session
      </h4>
      <p className="text-sm text-gray-500 leading-relaxed mb-8">{content}</p>

      <div className="flex items-center justify-end gap-3">
        <button
          className="btn-danger"
          onClick={onDelete}
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
