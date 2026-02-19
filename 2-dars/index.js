const express = require("express")
require("dotenv").config()
const cors = require("cors")

const galleryRouter = require("./router/gallery.routes")

const app = express()
app.use(cors())
app.use(express.json())

app.use(galleryRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
  console.log("running at", PORT);
})