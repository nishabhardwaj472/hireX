/* eslint-disable no-unused-vars */
import { APP_FEATURES } from "../Util/data.js";
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LuArrowRight, LuZap, LuLayoutList, LuGithub, LuLinkedin,
  LuLayoutGrid, LuBrainCircuit, LuPin, LuSparkles,
  LuShieldCheck, LuTrendingUp, LuBookOpen, LuChevronRight
} from "react-icons/lu";
import { motion } from "framer-motion";
import Login from "./Auth/Login.jsx";
import SignUp from "./Auth/SignUp.jsx";
import { UserContext } from "../Context/UserContext.jsx";
import ProfileInfoCard from "../Components/Cards/ProfileInfoCard.jsx";
import Modal from "../Components/Modal.jsx";

/* ─── Mock UI Previews (CSS-based, no images) ──────────────── */
const DashboardPreview = () => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm text-left overflow-hidden">
    {/* Navbar strip */}
    <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-orange-500 to-amber-600" />
        <span className="text-xs font-black text-gray-900 tracking-tight">HireX</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
          <span className="text-[8px] font-black text-orange-400">NB</span>
        </div>
      </div>
    </div>

    {/* Stats row */}
    <div className="grid grid-cols-3 gap-2 mb-4">
      {[
        { label: "Sessions", value: "12", color: "text-orange-400", bg: "bg-orange-500/10" },
        { label: "Questions", value: "140", color: "text-sky-400", bg: "bg-sky-500/10" },
        { label: "Updated", value: "Today", color: "text-emerald-400", bg: "bg-emerald-500/10" },
      ].map((s, i) => (
        <div key={i} className={`${s.bg} rounded-xl p-2.5 border border-white/[0.05]`}>
          <p className={`text-sm font-black ${s.color}`}>{s.value}</p>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold">{s.label}</p>
        </div>
      ))}
    </div>

    {/* Session cards */}
    {[
      { role: "Frontend Dev", topics: "React, TypeScript", exp: "3 Yrs", q: 20 },
      { role: "System Design", topics: "Architecture, APIs", exp: "5 Yrs", q: 15 },
      { role: "Data Scientist", topics: "ML, Python, Stats", exp: "2 Yrs", q: 18 },
    ].map((card, i) => (
      <div
        key={i}
        className="mb-2 rounded-xl border border-gray-100 bg-gray-50 overflow-hidden hover:border-orange-500/20 transition-colors"
      >
        <div className="p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-black text-gray-900">{card.role.slice(0, 2).toUpperCase()}</span>
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-xs font-bold text-gray-900 truncate">{card.role}</p>
            <p className="text-[9px] text-gray-500 truncate">{card.topics}</p>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <span className="text-[8px] font-bold text-[#FF9324] px-1.5 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded-md">{card.q} Q&A</span>
            <span className="text-[8px] font-bold text-gray-500 px-1.5 py-0.5 bg-white border border-gray-200 rounded-md">{card.exp}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const QuestionPreview = () => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-4 bg-orange-500 rounded-full" />
        <span className="text-xs font-black text-gray-900">Interview Q&A</span>
      </div>
      <span className="text-[9px] text-orange-400 font-bold uppercase tracking-widest">12 questions</span>
    </div>

    {/* Progress */}
    <div className="h-px bg-gray-200 mb-5 overflow-hidden rounded-full">
      <div className="h-full w-3/5 bg-gradient-to-r from-orange-500/60 to-orange-500/20 rounded-full" />
    </div>

    {/* Question cards */}
    {[
      { q: "What is React's virtual DOM and why does it improve performance?", expanded: true },
      { q: "Explain the difference between useEffect and useLayoutEffect.", expanded: false },
      { q: "How does TypeScript improve JavaScript development?", expanded: false },
    ].map((item, i) => (
      <div
        key={i}
        className={`mb-2.5 rounded-xl border transition-colors ${item.expanded ? "bg-white border-gray-300 shadow-sm" : "bg-white border-gray-200"}`}
      >
        <div className="p-3 flex items-start gap-3">
          <div className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-black ${item.expanded ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500"}`}>
            {i + 1}
          </div>
          <p className={`text-[11px] font-medium leading-relaxed flex-grow ${item.expanded ? "text-gray-900" : "text-gray-500"}`}>{item.q}</p>
          {item.expanded && (
            <div className="flex gap-1 shrink-0">
              <div className="w-5 h-5 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <LuSparkles size={8} className="text-sky-400" />
              </div>
              <div className="w-5 h-5 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <LuPin size={8} className="text-orange-400" />
              </div>
            </div>
          )}
        </div>
        {item.expanded && (
          <div className="px-3 pb-3 ml-9">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-1 h-3 bg-orange-500 rounded-full" />
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">AI Answer</span>
              </div>
              <p className="text-[10px] text-gray-600 leading-relaxed">React's virtual DOM is an in-memory representation of the real DOM. React uses diffing algorithms to only update changed nodes, significantly reducing DOM operations...</p>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);

/* ─── Feature data ──────────────────────────────────────────── */
const FEATURE_ICONS = [LuBrainCircuit, LuBookOpen, LuPin, LuSparkles, LuTrendingUp];

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setcurrentPage] = useState("login");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTA = () => {
    !user ? setOpenAuthModal(true) : navigate("/dashboard");
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 selection:bg-orange-500/20 selection:text-orange-900 overflow-x-hidden">

      {/* ── Global Ambient Glow ───────────────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-5%] w-[55%] h-[55%] bg-orange-600/[0.07] blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-orange-900/[0.07] blur-[130px] rounded-full" />
      </div>

      {/* ── Navigation ───────────────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-2xl border-b border-gray-200 py-3"
          : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-xl shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform duration-300">
              <img src="/favicon.svg" alt="Logo" className="h-5 w-5 invert" />
            </div>
            <span className="text-xl font-black tracking-tight">
              HireX
              <span className="text-[9px] text-orange-500 font-bold ml-1.5 align-middle bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 rounded-md">PRO</span>
            </span>
          </Link>

          {/* Right nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Features</a>
            {user && (
              <Link to="/dashboard" className="flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-orange-400 transition-colors">
                <LuLayoutGrid size={15} /> Dashboard
              </Link>
            )}
            <div className="h-4 w-px bg-gray-200" />
            {user ? (
              <ProfileInfoCard />
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setOpenAuthModal(true)}
                  className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={handleCTA}
                  className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-black hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-md shadow-gray-900/10 cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile auth */}
          {!user && (
            <button
              onClick={handleCTA}
              className="md:hidden bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold cursor-pointer"
            >
              Start
            </button>
          )}
        </div>
      </nav>

      <main className="relative z-10">

        {/* ── Hero Section ──────────────────────────────────── */}
        <section className="pt-40 pb-16 container mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-[11px] font-bold uppercase tracking-[0.15em] mb-8"
          >
            <LuZap size={11} className="fill-current" />
            Next-Gen AI Interview Simulation
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black tracking-tight leading-[1.0] mb-6"
          >
            Cracking Interviews..
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-400">
              is now automated.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Stop guessing what the interviewer wants. Use HireX's low-latency AI to simulate high-pressure role-specific interviews with real-time feedback.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.42, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20"
          >
            <button
              onClick={handleCTA}
              className="group flex items-center gap-3 bg-[#FF9324] hover:bg-[#e8831a] text-white px-9 py-4 rounded-2xl font-black text-base transition-all shadow-[0_16px_48px_rgba(255,147,36,0.3)] hover:shadow-[0_20px_56px_rgba(255,147,36,0.45)] active:scale-[0.97] cursor-pointer"
            >
              Start Your First Session
              <LuArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => setOpenAuthModal(true)}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer group"
            >
              <span>Already have an account?</span>
              <LuChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* ── Dashboard Preview Card ── */}
          <motion.div
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-4xl mx-auto"
          >
            {/* Orange glow behind preview */}
            <div className="absolute inset-0 bg-orange-500/15 blur-[80px] -z-10 rounded-full scale-75" />

            {/* Preview container */}
            <div className="relative rounded-[2rem] border border-gray-200 bg-white p-3 shadow-xl overflow-hidden group">
              {/* Gradient fade at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-transparent to-transparent z-10 pointer-events-none rounded-[2rem]" />
              <div className="rounded-[1.5rem] overflow-hidden border border-gray-200">
                <DashboardPreview />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Stats Bar ─────────────────────────────────────── */}
        <motion.section
          {...fadeInUp}
          className="py-12 border-y border-gray-200 bg-gray-50/50"
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { num: "10K+", label: "Interview Questions" },
                { num: "< 1s", label: "AI Response Time" },
                { num: "50+", label: "Role Categories" },
                { num: "100%", label: "Groq-Powered" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{stat.num}</p>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Features Bento ────────────────────────────────── */}
        <section id="features" className="py-24 container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4">
              <LuShieldCheck size={12} />
              Platform Features
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Everything you need to <br />
              <span className="text-[#FF9324]">land your dream role.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

            {/* Large: Centralized Hub */}
            <motion.div
              {...fadeInUp}
              className="md:col-span-7 group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-10 hover:border-gray-300 shadow-sm transition-all duration-400"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                  <LuLayoutList className="text-orange-500" size={22} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tight text-gray-900">Centralized Hub</h3>
                <p className="text-gray-500 text-base max-w-sm leading-relaxed">
                  Manage multiple job profiles from a single dashboard. Track progress, delete old sessions, and restart anytime.
                </p>
              </div>
              {/* Decorative preview */}
              <div className="absolute right-0 bottom-0 w-[55%] opacity-30 group-hover:opacity-60 transition-all duration-500 pointer-events-none p-4">
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-3 transform rotate-[-5deg] translate-x-4 translate-y-4">
                  {[
                    { role: "Frontend Dev", color: "#0f2418" },
                    { role: "System Design", color: "#0a1a2a" },
                  ].map((c, i) => (
                    <div key={i} className="mb-2 p-2 rounded-lg border border-gray-100" style={{ background: c.color }}>
                      <p className="text-[9px] font-bold text-gray-500">{c.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Small: Groq Speed */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-5 group rounded-[2rem] border border-gray-200 bg-white shadow-sm p-10 hover:border-sky-500/30 hover:bg-sky-500/[0.02] transition-all duration-400"
            >
              <LuZap className="text-sky-400 mb-6 animate-pulse" size={32} />
              <h3 className="text-xl md:text-2xl font-black mb-3 leading-tight tracking-tight text-gray-900">Groq-Speed Intelligence</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sub-second AI generation for questions and deep-dive solutions. No loading screens, just pure performance.
              </p>
            </motion.div>

            {/* Bottom Feature Cards */}
            {APP_FEATURES.slice(0, 3).map((feature, idx) => {
              const Icon = FEATURE_ICONS[idx] || LuBrainCircuit;
              return (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="md:col-span-4 group rounded-[1.5rem] border border-gray-200 bg-white shadow-sm p-8 hover:border-orange-500/25 hover:bg-orange-500/[0.02] transition-all duration-400 cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5">
                    <Icon size={18} className="text-orange-500" />
                  </div>
                  <h4 className="font-black text-lg text-gray-900 mb-3 tracking-tight">{feature.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── How it works / Interview UI ───────────────────── */}
        <section className="py-24 bg-gray-50/50 border-y border-gray-200">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Copy */}
            <motion.div {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6">
                <LuSparkles size={11} />
                AI Sessions
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">
                AI sessions that <br />
                <span className="text-[#FF9324]">actually work.</span>
              </h2>
              <ul className="space-y-4">
                {[
                  "Context-aware question generation",
                  "Deep-dive solutions for every query",
                  "Experience-level tuned difficulty",
                  "Personalized topic focus",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-600 text-sm font-medium">
                    <div className="w-5 h-5 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleCTA}
                className="group mt-10 flex items-center gap-2.5 bg-white border border-gray-200 hover:border-orange-500/40 hover:bg-orange-500/[0.05] text-gray-900 shadow-sm px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer"
              >
                Try it now
                <LuArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Right: Question UI Preview */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 bg-sky-500/[0.06] blur-[80px] rounded-full pointer-events-none" />
              <div className="relative">
                <QuestionPreview />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA Banner ─────────────────────────────────────── */}
        <motion.section
          {...fadeInUp}
          className="py-24 container mx-auto px-6 text-center"
        >
          <div className="relative max-w-3xl mx-auto rounded-[2rem] border border-gray-200 bg-white shadow-xl p-14 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.06] via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-bold uppercase tracking-widest mb-6">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                Ready to Start?
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-gray-900">
                Your next interview starts here.
              </h2>
              <p className="text-gray-500 text-base mb-8 max-w-md mx-auto leading-relaxed font-medium">
                Generate role-specific questions, explore AI explanations, and track your progress — all in one place.
              </p>
              <button
                onClick={handleCTA}
                className="group inline-flex items-center gap-3 bg-[#FF9324] hover:bg-[#e8831a] text-white px-10 py-4 rounded-2xl font-black text-base transition-all shadow-[0_12px_40px_rgba(255,147,36,0.3)] hover:shadow-[0_16px_48px_rgba(255,147,36,0.45)] active:scale-[0.97] cursor-pointer"
              >
                Get Started Free
                <LuArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-200 py-14">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-xl shadow-lg shadow-orange-500/20">
                <img src="/favicon.svg" alt="Logo" className="h-5 w-5 invert" />
              </div>
              <span className="text-xl font-black tracking-tight">HireX</span>
            </div>
            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-2">
              Ultra-low latency AI interview coach for students and professionals.
            </p>
            <p className="text-gray-400 text-xs font-medium">
              — Developed by Nevin Bali
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Socials</span>
              <a href="https://github.com/Nevin100" className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium">
                <LuGithub size={14} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/nevin-bali-aa744a2b6/" className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm font-medium">
                <LuLinkedin size={14} /> LinkedIn
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Status</span>
              <span className="flex items-center gap-2 text-[11px] text-emerald-400 font-bold">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                AI Node Active
              </span>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="container mx-auto px-6 mt-10 pt-6 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 font-medium">
            © 2026 HireX. Built with Groq AI.
          </p>
        </div>
      </footer>

      {/* ── Auth Modal ──────────────────────────────────────── */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => { setOpenAuthModal(false); setcurrentPage("login"); }}
        hideHeader
      >
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {currentPage === "login" && <Login setcurrentPage={setcurrentPage} />}
          {currentPage === "signup" && <SignUp setcurrentPage={setcurrentPage} />}
        </motion.div>
      </Modal>
    </div>
  );
};

export default LandingPage;