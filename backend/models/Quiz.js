import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctAnswer: String
});

export default mongoose.model("Quiz", quizSchema);
