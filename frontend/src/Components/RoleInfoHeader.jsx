/* eslint-disable no-unused-vars */
const RoleInfoHeader = ({ role, topicsToFocus, experience, questions, lastUpdated, description }) => {
  return (
    <div className="relative overflow-hidden bg-white border-b border-gray-200">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[50%] h-full opacity-25 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-[#FF9324] blur-[110px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[10%] w-56 h-56 bg-blue-600 blur-[130px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12 md:py-14 relative z-10">
        <div className="max-w-4xl">
          {/* Active badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Active Session
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-3 leading-[1.1]">
            {role}
            <span className="text-[#FF9324] text-xl md:text-2xl font-semibold ml-3 align-middle">
              Prep
            </span>
          </h1>

          {/* Topics */}
          {topicsToFocus && (
            <p className="text-gray-500 text-sm md:text-base mb-7 font-medium">
              Focused on:{" "}
              <span className="text-gray-700 font-semibold">{topicsToFocus}</span>
            </p>
          )}

          {/* Meta pills */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { label: "Experience", value: `${experience} Years` },
              { label: "Questions", value: `${questions} Q&A` },
              { label: "Updated", value: lastUpdated },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl shadow-sm"
              >
                <span className="text-[9px] block uppercase tracking-widest text-gray-500 font-bold mb-0.5">
                  {stat.label}
                </span>
                <span className="text-sm text-gray-900 font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;