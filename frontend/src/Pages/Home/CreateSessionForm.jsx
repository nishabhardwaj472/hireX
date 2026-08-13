import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Inputs/Input.jsx";
import SpinnerLoader from "../../Components/Loaders/SpinnerLoader.jsx";
import axiosInstance from "../../Util/axiosInstance.js";
import { API_PATHS } from "../../Util/ApiPath.js";
import { LuBrainCircuit, LuArrowRight, LuZap } from "react-icons/lu";

const CreateSessionForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    role: "",
    experience: 0,
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;
    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generatedQuestions = aiResponse.data.data;
      console.log("Generated Questions : ", generatedQuestions);

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });
      console.log("Response Session Create Form  : ", response);

      if (response.data?.data?._id) {
        navigate(`/interview-prep/${response.data?.data?._id}`);
      }
    } catch (err) {
      console.error("Create Session error:", err);
      if (err.response) {
        console.log("Response:", err.response.data);
        setError(err.response.data.message || "Session Creation failed.");
      } else {
        console.log("Error Message:", err.message);
        setError("Network error. Check console.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[540px] p-8 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#FF9324]/10 border border-[#FF9324]/20 flex items-center justify-center">
            <LuBrainCircuit size={20} className="text-[#FF9324]" />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900 tracking-tight leading-none mb-1">
              New Interview Session
            </h3>
            <p className="text-[11px] text-gray-500 font-medium uppercase tracking-widest">
              AI-Powered Prep
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          Fill in a few details and we'll generate a personalized set of interview questions using AI.
        </p>
        <div className="h-px w-full bg-gray-200 mt-5" />
      </div>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-5">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role *"
          placeholder="e.g., Frontend Developer, UI/UX Designer"
          type="text"
        />
        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience *"
          placeholder="e.g., 2"
          type="number"
        />
        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus On *"
          placeholder="e.g., React.js, Node.js, System Design"
          type="text"
        />
        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description (optional)"
          placeholder="Any specific goals or notes for this session"
          type="text"
        />

        {error && (
          <div className="flex items-center gap-2.5 px-4 py-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
            <span className="text-xs text-rose-400 font-medium">{error}</span>
          </div>
        )}

        {/* Loading state info */}
        {isLoading && (
          <div className="flex items-center gap-3 px-4 py-3 bg-[#FF9324]/[0.07] border border-[#FF9324]/20 rounded-xl">
            <LuZap size={14} className="text-[#FF9324] animate-pulse shrink-0" />
            <span className="text-xs text-[#FF9324]/80 font-medium">
              AI is generating your personalized questions...
            </span>
          </div>
        )}

        <button
          type="submit"
          className="btn-primary mt-1 group"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <SpinnerLoader />
              <span>Generating Session...</span>
            </>
          ) : (
            <>
              Generate My Session
              <LuArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
