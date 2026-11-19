const express = require('express')
const router = express.Router()

const { createTopic, getTopics,getTopicById, deleteTopic } = require("../controllers/topicController")


router.post("/", createTopic);
router.get("/", getTopics)
router.get("/:id", getTopicById)
router.delete("/:id",deleteTopic)

module.exports = router 