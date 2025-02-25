// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";



// dotenv.config();

// import quizRoutes from "./routes/quizRoutes.js";

// const app = express();
// // app.use(cors());
// // CORS Configuration
// const corsOptions = {
//   origin: "https://portfolio-web-mern-frontend.vercel.app", // Your frontend domain
//   methods: "GET,POST,PUT,DELETE", // Allow specific HTTP methods
//   allowedHeaders: "Content-Type,Authorization", // Allow specific headers
// };


// app.use(express.json());



// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Connected to MongoDB Atlas"))
//   .catch(err => console.log("❌ MongoDB Connection Error:", err));



//   app.use("/api/quiz", quizRoutes);
//   app.use(cors(corsOptions));
// app.listen(5000, () => console.log("🚀 Server running on port 5000"));



// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// import quizRoutes from "./routes/quizRoutes.js";

// const app = express();

// // CORS Configuration
// const corsOptions = {
//   origin: "https://portfolio-web-mern-frontend.vercel.app", // Your frontend domain
//   methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
//   allowedHeaders: "Content-Type,Authorization", // Allowed headers
// };

// app.use(cors(corsOptions)); // CORS should be used before routes
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Connected to MongoDB Atlas"))
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1); // Exit process if DB connection fails
//   });

// app.use("/api/quiz", quizRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import quizRoutes from "./routes/quizRoutes.js";

const app = express();

// ✅ Correct CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // ✅ Vite Frontend (Development)
  "http://localhost:3000", // ✅ React Default Frontend (If needed)
  "https://velvety-pudding-e59557.netlify.app", // ✅ Deployed Frontend
  "https://velvety-pudding-e59557.netlify.app" // ✅ Another Deployed Frontend
];

const corsOptions = {
  origin: "https://velvety-pudding-e59557.netlify.app", // Your frontend domain
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ✅ Handle preflight requests

app.use(express.json());

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// ✅ API Routes
app.use("/api/quiz", quizRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.json({ message: "Hello, this is your message API!" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
