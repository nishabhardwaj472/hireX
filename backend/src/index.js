import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import connectDb from "./Utils/db.js";
import authRoutes from "./Routes/Auth.routes.js";
import sessionRoutes from "./Routes/Session.routes.js";
import questionRoutes from "./Routes/Question.Routes.js";
import verifyToken from "./Middlewares/Auth.Middleware.js";
import {
  conceptExplainPrompt,
  questionAnswerPrompt,
} from "./Utils/prompt.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PORT = process.env.PORT || 4000;

// ============================================
// MIDDLEWARES
// ============================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://hire-wire-three.vercel.app",
  "https://hirewire.nevinbali.me",
];

// Add your deployed frontend URL through FRONTEND_URL
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming request origin:", origin);

      // Allow requests without an origin
      // Example: Postman, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
  })
);

app.use(cookieParser());

// ============================================
// ROUTES
// ============================================

// Authentication
app.use("/api/auth", authRoutes);

// Interview sessions
app.use("/api/sessions", sessionRoutes);

// Questions
app.use("/api/questions", questionRoutes);

// ============================================
// HEALTH CHECK
// ============================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HireX backend is running successfully",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

// ============================================
// GROQ AI
// ============================================

const callGroq = async (prompt) => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing");
  }

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },

      body: JSON.stringify({
        model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",
            content:
              "Return ONLY valid JSON. Do not include explanations, markdown, or extra text.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.3,
        max_tokens: 800,

        response_format: {
          type: "json_object",
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Groq API error:", errorText);

    throw new Error("Groq API failed");
  }

  const data = await response.json();

  return data.choices[0].message.content;
};

// ============================================
// AI - GENERATE INTERVIEW QUESTIONS
// ============================================

app.post(
  "/api/ai/generate-questions",
  verifyToken,
  async (req, res) => {
    try {
      const {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions,
      } = req.body;

      if (
        !role ||
        !experience ||
        !topicsToFocus ||
        !numberOfQuestions
      ) {
        return res.status(400).json({
          success: false,
          error: "All fields are required",
        });
      }

      const prompt = questionAnswerPrompt(
        role,
        experience,
        topicsToFocus,
        numberOfQuestions
      );

      const rawText = await callGroq(prompt);

      const cleanText = rawText
        .replace(/^```json\s*/i, "")
        .replace(/```$/i, "")
        .trim();

      const data = JSON.parse(cleanText);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(
        "Generate questions error:",
        error
      );

      return res.status(500).json({
        success: false,
        error: "Failed to generate interview questions",
      });
    }
  }
);

// ============================================
// AI - GENERATE EXPLANATION
// ============================================

app.post(
  "/api/ai/generate-explanations",
  verifyToken,
  async (req, res) => {
    try {
      const { question } = req.body;

      if (!question) {
        return res.status(400).json({
          success: false,
          error: "Question is required",
        });
      }

      const prompt = conceptExplainPrompt(question);

      const rawText = await callGroq(prompt);

      const cleanText = rawText
        .replace(/^```json\s*/i, "")
        .replace(/```$/i, "")
        .trim();

      const data = JSON.parse(cleanText);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(
        "Generate explanation error:",
        error
      );

      return res.status(500).json({
        success: false,
        error: "Failed to generate explanation",
      });
    }
  }
);

// ============================================
// UPLOADS
// ============================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "Uploads")
  )
);

// ============================================
// ERROR HANDLER
// ============================================

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      error: "CORS error: Origin not allowed",
    });
  }

  return res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

// ============================================
// START SERVER
// ============================================

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error(
      "Failed to start server:",
      error
    );

    process.exit(1);
  }
};

startServer();