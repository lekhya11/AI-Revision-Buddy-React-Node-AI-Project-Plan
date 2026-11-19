const express = require('express')
const router = express.Router()

const { generateAiQuestion } = require("../controllers/aiController")


router.post("/generate", generateAiQuestion);

module.exports = router