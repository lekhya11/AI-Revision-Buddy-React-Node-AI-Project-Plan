const Topic = require("../models/Topic")

// console.log("Topic Model Loaded:", Topic.modelName)


// Once CRUD works, think about how the flow should look: the user generates a topic first and chooses to save it afterwards. So /api/ai/generate still just returns content, and the React app sends that content to POST /api/topics when the user clicks Save. That keeps the AI route simple and avoids saving things nobody wanted.

//1.create Topic
const createTopic = async (req, res, next) => {
    try {

        const { title, level, explanation, flashcards, quiz } = req.body
        if (!title || typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                message: "Title is required"
            })
        }

        const topic = await Topic.create({
            title,level,explanation,flashcards,quiz
        })

        res.status(201).json({
            message: "Topic created successfully",
            topic
        })
    } catch (err) {
        next(err)
    }
}


//2. get All Topics
const getTopics = async (req, res, next) => {
    try {
        const topics = await Topic.find().sort({ createdAt: -1 })
        
        res.status(200).json({topics})
    } catch (err) {
        next(err)
    }
}


//3.get Topic by ID
const getTopicById = async (req, res, next) => {
    try {

        const topic = await Topic.findById(req.params.id);

        if (!topic) {
            return res.status(404).json({
                message: "Topic not found"
            })
        }

        res.status(200).json({topic})
        
    } catch (err) {
        next(err)
    }
}


//4. Delete Topic
const deleteTopic = async (req, res, next) => {
    try {
        
        const topic = await Topic.findByIdAndDelete(req.params.id);

        if (!topic) {
            return res.status(404).json({
                message: "Topic not found"
            })
        }

        res.status(200).json({message:"Topic deleted successfully", topic})
    } catch (err) {
        next(err)
    }
}


module.exports = {createTopic,getTopics, getTopicById,deleteTopic}


// Understand the important parts
// 1. Topic.create()

// Creates and saves a new topic in MongoDB.

// 2. Topic.find().sort({ createdAt: -1 })
// - find() gets all topics.
// - sort() sorts the results.
// - -1 means descending order (newest first).
// - If no topics exist, it returns [].
// 3. Topic.findById()

// Finds one topic using its MongoDB _id.

// 4. Topic.findByIdAndDelete()

// Finds and deletes a topic using its _id.