/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { LuPlus, LuZap, LuBrainCircuit, LuListChecks, LuClock, LuArrowRight } from "react-icons/lu";
import { CARD_BG } from "../../Util/data.js";
import toast from "react-hot-toast";
import DashboardLayout from "../../Components/layout/DashboardLayout.jsx";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Util/axiosInstance.js";
import { API_PATHS } from "../../Util/ApiPath.js";
import moment from "moment";
import SummaryCard from "../../Components/Cards/SummaryCard.jsx";
import Modal from "../../Components/Modal.jsx";
import CreateSessionForm from "./CreateSessionForm.jsx";
import DeleteAlertContent from "../../Components/DeleteAlertContent.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../../Context/UserContext.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [OpenDeleteAlert, setOpenDeleteAlert] = useState({
    data: null,
    open: false,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response?.data?.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load sessions");
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      toast.error("Internal server issue");
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  const totalQuestions = sessions.reduce(
    (acc, s) => acc + (s?.questions?.length || 0),
    0
  );
  const firstName = user?.name?.split(" ")[0] || "there";

  const stats = [
    {
      label: "Total Sessions",
      value: sessions.length,
      icon: LuBrainCircuit,
      color: "text-[#FF9324]",
      bg: "bg-[#FF9324]/10",
      border: "border-[#FF9324]/20",
    },
    {
      label: "Total Questions",
      value: totalQuestions,
      icon: LuListChecks,
      color: "text-sky-400",
      bg: "bg-sky-400/10",
      border: "border-sky-400/20",
    },
    {
      label: "Last Activity",
      value: sessions.length > 0
        ? moment(sessions[0]?.updatedAt).fromNow()
        : "—",
      icon: LuClock,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
    },
  ];

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[280px] bg-[#FF9324]/[0.03] blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 container mx-auto pt-10 pb-28 px-4 md:px-8 max-w-7xl">

          {/* ── Hero Section ──────────────────────────────── */}
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF9324]/[0.08] border border-[#FF9324]/20 mb-5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF9324] animate-pulse" />
              <span className="text-[10px] font-bold text-[#FF9324] uppercase tracking-[0.2em]">
                AI Ready
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-3 leading-[1.1]">
              Hey, {firstName} 👋
            </h1>
            <p className="text-gray-500 text-base md:text-lg font-medium max-w-xl leading-relaxed">
              Ready for your next interview? Practice with AI-powered sessions tailored to your exact role and experience.
            </p>

            <div className="h-px w-full bg-gradient-to-r from-gray-200 to-transparent mt-8" />
          </motion.header>

          {/* ── Stats Row ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm`}
              >
                <div className={`w-10 h-10 rounded-xl ${stat.bg} border ${stat.border} flex items-center justify-center shrink-0`}>
                  <stat.icon size={18} className={stat.color} />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900 leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── Sessions Section ────────────────────────────── */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[#FF9324] rounded-full" />
              <h2 className="text-lg font-black text-gray-900 tracking-tight">
                Your Sessions
              </h2>
            </div>
            {sessions.length > 0 && (
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
                {sessions.length} {sessions.length === 1 ? "session" : "sessions"}
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {sessions.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="min-h-[45vh] flex flex-col items-center justify-center border border-gray-200 rounded-[2rem] bg-white/60 backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-[#FF9324]/10 rounded-2xl flex items-center justify-center mb-5 border border-[#FF9324]/20 shadow-[0_0_30px_rgba(255,147,36,0.08)]">
                  <LuZap size={26} className="text-[#FF9324]" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">
                  No sessions yet
                </h3>
                <p className="text-sm text-gray-500 text-center max-w-[260px] mb-8 leading-relaxed">
                  Launch your first AI-powered session and start mastering your target role.
                </p>
                <button
                  onClick={() => setOpenCreateModal(true)}
                  className="group flex items-center gap-2.5 bg-[#FF9324] hover:bg-[#e8831a] text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all shadow-[0_4px_20px_rgba(255,147,36,0.3)] hover:shadow-[0_6px_28px_rgba(255,147,36,0.45)] active:scale-[0.97] cursor-pointer"
                >
                  <LuPlus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
                  New Session
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="sessions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {sessions.map((data, index) => (
                  <motion.div
                    key={data?._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <SummaryCard
                      colors={CARD_BG[index % CARD_BG.length]}
                      role={data?.role || ""}
                      topicsToFocus={data?.topicsToFocus || "-"}
                      experience={data?.experience || "-"}
                      questions={data?.questions?.length || "0"}
                      description={data?.description || ""}
                      lastUpdated={
                        data?.updatedAt
                          ? moment(data.updatedAt).format("DD MMM YYYY")
                          : ""
                      }
                      onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                      onDelete={() => setOpenDeleteAlert({ open: true, data })}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Action Button */}
        <button
          className="fixed bottom-8 right-8 md:bottom-10 md:right-10 h-14 flex items-center gap-3 bg-gradient-to-br from-[#FF9324] to-[#e8731a] text-white px-7 rounded-2xl font-bold text-sm shadow-[0_8px_32px_rgba(255,147,36,0.35)] z-50 hover:scale-[1.03] active:scale-[0.97] transition-all border border-white/10 cursor-pointer"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus size={20} />
          <span className="hidden sm:inline">New Session</span>
        </button>
      </div>

      {/* Create Session Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm onClose={() => setOpenCreateModal(false)} />
      </Modal>

      {/* Delete Alert Modal */}
      <Modal
        isOpen={OpenDeleteAlert?.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Confirm Delete"
      >
        <DeleteAlertContent
          content="This will permanently delete this preparation session. Continue?"
          onDelete={() => deleteSession(OpenDeleteAlert.data)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
