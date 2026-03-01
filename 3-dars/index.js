const express = require("express")
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db.config")
const authorRouter = require("./router/author.routes")
const bookRouter = require("./router/book.routes")
const errorMiddleware = require("./middleware/error.middleware")
const authRouter = require("./router/auth.routes")
const quoteRouter = require("./router/quote.routes")

connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Routes
app.use(authorRouter)
app.use(authRouter)
app.use(bookRouter)
app.use(quoteRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{ 
  console.log("running at: "+ PORT)
})

