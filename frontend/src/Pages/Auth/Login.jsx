import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Inputs/Input.jsx";
import { validateEmail } from "../../Util/helper.js";
import axiosInstance from "../../Util/axiosInstance.js";
import { API_PATHS } from "../../Util/ApiPath.js";
import { UserContext } from "../../Context/UserContext.jsx";
import { LuArrowRight, LuZap } from "react-icons/lu";
import SpinnerLoader from "../../Components/Loaders/SpinnerLoader.jsx";

const Login = ({ setcurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      console.log("Login response:", response.data);
      updateUser(response.data.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[420px] p-8 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-lg bg-[#FF9324]/10 border border-[#FF9324]/20 flex items-center justify-center">
            <LuZap size={14} className="text-[#FF9324]" />
          </div>
          <span className="text-xs font-bold text-[#FF9324] uppercase tracking-widest">HireX</span>
        </div>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
          Welcome back
        </h3>
        <p className="text-sm text-gray-500 font-medium">
          Sign in to continue your interview prep
        </p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="you@example.com"
          label="Email Address"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          label="Password"
        />

        {error && (
          <div className="flex items-center gap-2 px-4 py-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
            <span className="text-xs text-rose-400 font-medium">{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="btn-primary mt-2 group"
          disabled={loading}
        >
          {loading ? (
            <SpinnerLoader />
          ) : (
            <>
              Sign In
              <LuArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>

        <p className="text-sm text-gray-500 text-center mt-2">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-semibold text-[#FF9324] hover:text-orange-300 transition-colors cursor-pointer"
            onClick={() => setcurrentPage("signup")}
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
