import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./Pages/LandingPage.jsx";
import Dashboard from "./Pages/Home/Dashboard.jsx";
import InterviewPrep from "./Pages/InterviewPrep/InterviewPrep.jsx";
import UserProvider from "./Context/UserContext.jsx";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/interview-prep/:sessionId"
              element={<InterviewPrep />}
            />
          </Routes>
        </Router>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0e0e12",
              color: "#F0F0F0",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "0.75rem",
              fontSize: "13px",
              fontWeight: "500",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            },
            success: {
              iconTheme: { primary: "#FF9324", secondary: "#0e0e12" },
            },
            error: {
              iconTheme: { primary: "#f43f5e", secondary: "#0e0e12" },
            },
          }}
        />
      </div>
    </UserProvider>
  );
};

export default App;
