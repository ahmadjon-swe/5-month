const BookSchema = require("../schema/book.schema")


// get_all ////////////////////////////////////////////////////////////////////////////////////
const getAllBooks = async (req, res) => {
  try {
    const books = await BookSchema.find()

    if(!books){
      return res.status(404).json({
        message: "404 books are not found"
      })
    }

    res.status(200).json(books)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


// get_one ////////////////////////////////////////////////////////////////////////////////////
const getOneBook = async (req, res) => {
  try {
    const reqID = req.params.id
    const book = await BookSchema.findById(reqID)

    if(!book){
      return res.status(404).json({
        message: "404 book is not found"
      })
    }

    res.status(200).json(book)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


// add ////////////////////////////////////////////////////////////////////////////////////
const addBook = async (req, res) => {
  try {
    const {title, pages, publishedYear, publishedHome, period, description, genre, imageUrl}= req.body

    if(!title || !pages || !publishedYear || !publishedHome || !period || !description || !genre || !imageUrl){
      return res.status(400).json({
        message: "all fields must be filled in"
      })
    }

    await BookSchema.create({title, pages, publishedYear, publishedHome, period, description, genre, imageUrl})

    res.status(201).json({
      message: "added new book"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


// update ////////////////////////////////////////////////////////////////////////////////////
const updateBook = async (req, res) => {
  try {
    const reqID = req.params.id
    const {title, pages, publishedYear, publishedHome, period, description, genre, imageUrl}= req.body

    const book = await BookSchema.findById(reqID)

    if(!book){
      return res.status(404).json({
        message: "404 book is not found"
      })
    }
    
    await BookSchema.findByIdAndUpdate(reqID, {title, pages, publishedYear, publishedHome, period, description, genre, imageUrl})

    res.status(201).json({
      message: "updated book"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


// delete ////////////////////////////////////////////////////////////////////////////////////
const deleteBook = async (req, res) => {
  try {
    const reqID = req.params.id

    const book = await BookSchema.findById(reqID)

    if(!book){
      return res.status(404).json({
        message: "404 book is not found"
      })
    }

    await BookSchema.findByIdAndDelete(reqID)

    res.status(201).json({
      message: "deleted book"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


// EXPORT ////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook
}