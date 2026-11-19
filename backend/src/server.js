const dotenv = require("dotenv")
const app = require("./app.js")
const connectDB = require('./config/db.js')


dotenv.config()

const port = process.env.PORT || 3008

connectDB()
  .then(() => {
      app.listen(port, () => {
         console.log(`Server is running at ${port}`) 
      })
  })
  .catch((error) => {
    console.error("DB connection failed:", error.message);
    process.exit(1);
})















// app.get("/api", (req,res) => {
//      res.send("hello world!")

// });
// app.get("path", function name) => this we write in routes
// function name => this function code is written in TaskController
// server.js => starting the server
// app.js=> middlerware
    
// //Test
// app.post("/api/test", (req, res) => {
//     const object = req.body;
//     res.json(object)

// })