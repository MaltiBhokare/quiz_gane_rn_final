// import express from "express";
// import Quiz from "../models/Quiz.js";

// const router = express.Router();

// // Get quiz questions
// router.get("/", async (req, res) => {
//     try {
//         const questions = await Quiz.find().limit(10);
//         res.json(questions);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Submit answers and calculate score
// router.post("/submit", async (req, res) => {
//     const { answers } = req.body;
//     const questions = await Quiz.find().limit(10);
//     let score = 0;

//     questions.forEach((q, index) => {
//         if (q.correctAnswer === answers[index]) {
//             score += 1;
//         }
//     });

//     res.json({ score });
// });

// export default router;
import express from "express";
import Quiz from "../models/Quiz.js";

const router = express.Router();

// ✅ Middleware to Add Correct CORS Headers
router.use((req, res, next) => {
    const allowedOrigins = [
        "http://localhost:5173", // ✅ Vite frontend (local)
        "http://localhost:3000", // ✅ React frontend (if needed)
        "https://velvety-pudding-e59557.netlify.app", // ✅ Deployed frontend
        "https://velvety-pudding-e59557.netlify.app" // ✅ Another frontend
    ];
    
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    next();
});

// ✅ Handle Preflight Requests
router.options("*", (req, res) => {
    res.sendStatus(200);
});

// ✅ Get Quiz Questions
router.get("/", async (req, res) => {
    try {
        const questions = await Quiz.find().limit(10);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ Submit Answers & Calculate Score
router.post("/submit", async (req, res) => {
    try {
        const { answers } = req.body;
        const questions = await Quiz.find().limit(10);
        let score = 0;

        questions.forEach((q, index) => {
            if (q.correctAnswer === answers[index]) {
                score += 1;
            }
        });

        res.json({ score });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
