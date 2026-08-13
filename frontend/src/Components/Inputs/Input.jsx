import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
        {label}
      </label>
      <div className="input-box">
        <input
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-400 text-sm"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={16}
                className="text-[#FF9324] cursor-pointer shrink-0 hover:text-orange-300 transition-colors"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={16}
                className="text-gray-400 cursor-pointer shrink-0 hover:text-gray-600 transition-colors"
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
