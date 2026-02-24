const express = require("express")
require("dotenv").config()
const cors = require("cors")

const connectDB = require("./config/db.config")
const authorRouter = require("./router/author.routes")
const bookRouter = require("./router/book.routes")
const errorMiddleware = require("./middleware/error.middleware")

connectDB()
const app = express()


app.use(cors())
app.use(express.json())

// Routes
app.use(authorRouter)
app.use(bookRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{ 
  console.log("running at: "+ PORT)
})

