/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext.jsx";
import Navbar from "../../Components/layout/Navbar.jsx";
import { motion } from "framer-motion";
import { LuLock, LuArrowRight } from "react-icons/lu";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-[#F8FAFC] selection:bg-orange-500/20 selection:text-orange-900">
      <Navbar />

      <main className="relative">
        {user ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        ) : (
          /* Unauthorized state */
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center max-w-xs"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-[#FF9324]/20 blur-[50px] rounded-full animate-glow-pulse" />
                <div className="relative z-10 w-20 h-20 bg-white border border-gray-200 rounded-3xl flex items-center justify-center shadow-sm">
                  <LuLock className="text-[#FF9324]" size={30} />
                </div>
              </div>

              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-3">
                Access Restricted
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-8 font-medium">
                Sign in to access your personalized interview preparation sessions and AI-powered insights.
              </p>

              <button
                onClick={() => window.location.href = "/"}
                className="group w-full flex items-center justify-center gap-2 py-3.5 bg-[#FF9324] hover:bg-[#e8831a] text-white font-bold text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(255,147,36,0.3)] hover:shadow-[0_6px_28px_rgba(255,147,36,0.45)] active:scale-[0.98] cursor-pointer"
              >
                Go to Login
                <LuArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>
        )}
      </main>

      {/* Ambient background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-15%] left-[-5%] w-[45%] h-[45%] bg-[#FF9324]/[0.02] blur-[130px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[35%] h-[35%] bg-blue-600/[0.02] blur-[130px] rounded-full" />
      </div>
    </div>
  );
};

export default DashboardLayout;