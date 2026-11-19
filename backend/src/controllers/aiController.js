

const generateAiQuestion = async (req, res, next) => {
    try {
        // throw new Error("test error")
        const { topic, level } = req.body;
        const finalLevel = level || "beginner"
        if (!topic || typeof topic !== "string" || topic.trim() == "" ) {
            const error = new Error("Topic is required");
            error.statusCode = 400;
            return next(error);
            } 
        const message = {
            topic: topic,
            level: finalLevel,
            explanation: "React is a JavaScript library for building user interfaces using reusable components.",
            flashcards: [
                { "question": "What is a component?", "answer": "A reusable piece of UI." },
                { "question": "What is JSX?", "answer": "A syntax that lets you write HTML-like code inside JavaScript." },
                { "question": "What does useState do?", "answer": "It lets a component store and update its own data." }
            ]
            }
        res.json(message)
    } catch (err) {
        next (err)
    }
}

module.exports = {generateAiQuestion}