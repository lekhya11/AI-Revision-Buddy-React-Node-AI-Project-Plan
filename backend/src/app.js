
const express = require("express");
const cors = require("cors")
const aiRoutes = require("./routes/aiRoutes")
const topicRoutes = require("./routes/topicRoutes")
const {notFound, centralErrorHandler} = require("./middleware/errorHandler")


const app = express();


//Middleware
app.use(express.json())
app.use(cors())


app.use("/api/ai", aiRoutes)
app.use("/api/topics", topicRoutes)
app.use(notFound);
app.use(centralErrorHandler)

module.exports = app