import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import { LuLayoutGrid, LuArrowLeft } from "react-icons/lu";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-[100] h-16 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 md:px-8">
      <div className="container mx-auto h-full flex items-center justify-between gap-4">

        {/* Left: Logo + Back */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#FF9324] hover:bg-orange-50 rounded-lg transition-all duration-200 group"
            title="Back to Home"
          >
            <LuArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          </Link>

          <div className="w-px h-5 bg-gray-200" />

          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#FF9324]/20 blur-lg rounded-full group-hover:bg-[#FF9324]/35 transition-all duration-500" />
              <div className="relative z-10 w-full h-full bg-gradient-to-br from-[#FF9324]/80 to-[#e8731a]/80 rounded-xl flex items-center justify-center border border-orange-500/10 group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/favicon.svg"
                  alt="HireX"
                  className="w-4.5 h-4.5 object-contain"
                />
              </div>
            </div>
            <span className="text-lg font-black tracking-tight hidden sm:block">
              <span className="text-gray-900">Hire</span>
              <span className="text-[#FF9324]">X</span>
            </span>
          </Link>
        </div>

        {/* Center: Dashboard link */}
        <Link
          to="/dashboard"
          className="hidden md:flex items-center gap-2 text-[11px] font-semibold text-gray-500 hover:text-gray-900 uppercase tracking-widest transition-colors duration-200 group"
        >
          <LuLayoutGrid size={14} className="group-hover:text-[#FF9324] transition-colors" />
          Dashboard
        </Link>

        {/* Right: Profile */}
        <ProfileInfoCard />
      </div>
    </nav>
  );
};

export default Navbar;