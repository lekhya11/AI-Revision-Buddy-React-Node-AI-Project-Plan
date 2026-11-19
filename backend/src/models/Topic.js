// Finish models/Topic.js

// Define a schema with these fields:

// title: string, required, trimmed
// level: string, limited to beginner or interview with enum, default beginner
// explanation: string
// flashcards: an array of objects, each with question and answer (both strings)
// quiz: an array of objects, each with question, options (array of strings), and correctIndex (number). Leave it empty for now, since quiz generation comes later.
// Timestamps turned on as a schema option

// Then create the model with mongoose.model("Topic", schema) and export it with module.exports.

// Check: the file loads without errors when you require it in the controller. If you like, paste Topic.js here and I’ll review it before you build on it.


const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        level: {
            type: String,
            enum: ["beginner", "interview"],
            default: "beginner"
        },
        explanation: {
            type: String
        },
        flashcards: [
            {
                question: {
                    type: String
                },
                answer: {
                    type: String
                }
            }
        ],
        quiz: [
            {
                question: {
                    type: String
                },
                options: [String],
                correctIndex: {
                    type: Number
                }
            }
        ],
    },
    {
      timestamps: true
    }
);


const Topic = mongoose.model("Topic", schema);

module.exports = Topic;
























