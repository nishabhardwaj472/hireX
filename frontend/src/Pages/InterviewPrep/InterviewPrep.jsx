/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse, LuSparkles } from "react-icons/lu";
import DrawerLoader from "../../Components/Loaders/DrawerLoader.jsx";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../Components/layout/DashboardLayout.jsx";
import RoleInfoHeader from "../../Components/RoleInfoHeader.jsx";
import axiosInstance from "../../Util/axiosInstance.js";
import { API_PATHS } from "../../Util/ApiPath.js";
import QuestionCard from "../../Components/Cards/QuestionCard.jsx";
import AiResponsePreviewer from "../../Components/AiResponsePreviewer.jsx";
import Drawer from "../../Components/Drawer.jsx";
import SpinnerLoader from "../../Components/Loaders/SpinnerLoader.jsx";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState("");

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId),
      );
      console.log("Individual Session data : ", response.data.data);
      if (response.data && response.data.data) {
        setSessionData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateConceptExplanation = async (question) => {
    try {
      setError("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATIONS,
        { question },
      );

      const explanationObj = response.data.data;
      console.log("Explanation :", explanationObj);

      setExplanation(explanationObj);
      setIsLoading(false);
    } catch (error) {
      setError("Failed to generate Explanation");
      setExplanation(null);
      setIsLoading(false);
      console.log(error);
    }
  };

  const toggleQuestionPinState = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId),
      );

      if (response.data && response.data.data.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadMoreQuesions = async () => {
    try {
      setIsUpdateLoader(true);
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        },
      );

      const generatedQuestions = aiResponse.data.data;
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        },
      );

      if (response.data) {
        toast.success("Added More Question Answers");
        setIsUpdateLoader(false);
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
    return () => {};
  }, [sessionId]);

  const sortedQuestions = [...(sessionData?.questions || [])].sort(
    (a, b) => (b.isPinned === true) - (a.isPinned === true)
  );
  const totalQuestions = sortedQuestions.length;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#F8FAFC]">
        <RoleInfoHeader
          role={sessionData?.role || ""}
          topicsToFocus={sessionData?.topicsToFocus || ""}
          experience={sessionData?.experience || "-"}
          questions={sessionData?.questions?.length || "-"}
          description={sessionData?.description || ""}
          lastUpdated={
            sessionData?.updatedAt
              ? moment(sessionData.updatedAt).format("DD MMM YYYY")
              : ""
          }
        />

        <div className="container mx-auto pt-10 pb-24 px-4 md:px-8 max-w-5xl">
          {/* Section header with progress */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[#FF9324] rounded-full" />
              <h2 className="text-lg font-black text-gray-900 tracking-tight">
                Interview Q&A
              </h2>
            </div>
            {totalQuestions > 0 && (
              <div className="flex items-center gap-2 text-[11px] text-gray-500 font-semibold uppercase tracking-widest">
                <span className="text-[#FF9324] font-black">{totalQuestions}</span>
                questions
              </div>
            )}
          </div>

          {/* Progress bar */}
          {totalQuestions > 0 && (
            <div className="h-px bg-gray-200 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF9324]/60 to-[#FF9324]/20 rounded-full transition-all duration-700"
                style={{ width: `${Math.min((totalQuestions / 20) * 100, 100)}%` }}
              />
            </div>
          )}

          <div className="grid grid-cols-12 gap-6">
            <div
              className={`col-span-12 transition-all duration-500 ${openLeanMoreDrawer ? "lg:col-span-12" : "lg:col-span-12"}`}
            >
              <AnimatePresence mode="popLayout">
                {sortedQuestions.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    layout
                  >
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      onLearnMore={() => generateConceptExplanation(data.question)}
                      isPinned={data?.isPinned}
                      onTogglePin={() => toggleQuestionPinState(data._id)}
                      index={index}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Load More */}
              {!isLoading && sessionData?.questions?.length > 0 && (
                <div className="flex items-center justify-center mt-10">
                  <button
                    className="group flex items-center gap-3 text-sm font-bold text-gray-500 bg-white border border-gray-200 hover:border-orange-400 hover:bg-orange-50 hover:text-gray-900 px-10 py-4 rounded-2xl shadow-sm transition-all duration-300 cursor-pointer disabled:opacity-50"
                    onClick={uploadMoreQuesions}
                    disabled={isUpdateLoader}
                  >
                    {isUpdateLoader ? (
                      <>
                        <SpinnerLoader />
                        <span>Generating more...</span>
                      </>
                    ) : (
                      <>
                        <LuSparkles size={16} className="text-[#FF9324] group-hover:rotate-12 transition-transform duration-300" />
                        Load More Questions
                        <LuListCollapse size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* AI Drawer */}
          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => setOpenLeanMoreDrawer(false)}
            title={!isLoading ? explanation?.title : "Generating explanation..."}
          >
            <div className="min-h-full">
              {isLoading && <DrawerLoader />}
              {!isLoading && explanation?.explanation && (
                <AiResponsePreviewer content={explanation?.explanation} />
              )}
              {!isLoading && error && (
                <div className="flex items-center gap-3 px-4 py-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                  <LuCircleAlert size={16} className="text-rose-400 shrink-0" />
                  <span className="text-sm text-rose-400 font-medium">{error}</span>
                </div>
              )}
            </div>
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
