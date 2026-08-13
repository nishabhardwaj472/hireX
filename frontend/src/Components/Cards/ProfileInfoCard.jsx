import { UserContext } from "../../Context/UserContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuLogOut, LuChevronDown } from "react-icons/lu";
import { getInitials } from "../../Util/helper.js";
import axiosInstance from "../../Util/axiosInstance.js";
import { API_PATHS } from "../../Util/ApiPath.js";

const ProfileInfoCard = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
    } catch (err) {
      console.error(err);
    } finally {
      clearUser();
      navigate("/");
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-2.5 group cursor-pointer">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF9324] to-[#e8731a] flex items-center justify-center text-white font-bold text-xs shadow-[0_4px_12px_rgba(255,147,36,0.3)] shrink-0">
        {getInitials(user?.name || "U")}
      </div>

      {/* Name + logout */}
      <div className="hidden sm:flex flex-col leading-none">
        <span className="text-sm font-semibold text-gray-900 leading-none mb-1 tracking-tight">
          {user?.name?.split(" ")[0] || "User"}
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-[10px] font-medium text-gray-500 hover:text-[#FF9324] uppercase tracking-widest transition-colors cursor-pointer"
        >
          <LuLogOut size={10} />
          <span>Logout</span>
        </button>
      </div>

      {/* Mobile logout icon */}
      <button
        onClick={handleLogout}
        className="sm:hidden w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#FF9324] hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
        title="Logout"
      >
        <LuLogOut size={15} />
      </button>
    </div>
  );
};

export default ProfileInfoCard;