const CustomErrorHandler = require("../error/custom-error.handler")
const BookSchema = require("../schema/book.schema")


// get_all ////////////////////////////////////////////////////////////////////////////////////
const getAllBooks = async (req, res, next) => {
  try {
    const books = await BookSchema.find().populate("authorInfo", "-_id fullname period work")

    if(!books){
      throw CustomErrorHandler.NotFound("404 books are not found")
    }

    res.status(200).json(books)
  } catch (error) {
    next(error)
  }
}


// get_one ////////////////////////////////////////////////////////////////////////////////////
const getOneBook = async (req, res, next) => {
  try {
    const reqID = req.params.id
    const book = await BookSchema.findById(reqID).populate("authorInfo")

    if(!book){
      throw CustomErrorHandler.NotFound("404 book is not found")
    }

    res.status(200).json(book)
  } catch (error) {
    next(error)
  }
}


// add ////////////////////////////////////////////////////////////////////////////////////
const addBook = async (req, res, next) => {
  try {
    const {title, pages, publishedYear, publishedHome, period, description, genre, imageUrl, authorInfo}= req.body

    if(!title || !pages || !publishedYear || !publishedHome || !period || !description || !genre || !imageUrl || !authorInfo){
      throw CustomErrorHandler.BadRequest("all fields must be filled in")
    }

    await BookSchema.create({title, pages, publishedYear, publishedHome, period, description, genre, imageUrl, authorInfo})

    res.status(201).json({
      message: "added new book"
    })
  } catch (error) {
    next(error)
  }
}


// update ////////////////////////////////////////////////////////////////////////////////////
const updateBook = async (req, res, next) => {
  try {
    const reqID = req.params.id
    const {title, pages, publishedYear, publishedHome, period, description, genre, imageUrl, authorInfo}= req.body

    const book = await BookSchema.findById(reqID)

    if(!book){
      throw CustomErrorHandler.NotFound("404 book is not found")
    }
    
    await BookSchema.findByIdAndUpdate(reqID, {title, pages, publishedYear, publishedHome, period, description, genre, imageUrl, authorInfo})

    res.status(201).json({
      message: "updated book"
    })
  } catch (error) {
    next(error)
  }
}


// delete ////////////////////////////////////////////////////////////////////////////////////
const deleteBook = async (req, res, next) => {
  try {
    const reqID = req.params.id

    const book = await BookSchema.findById(reqID)

    if(!book){
      throw CustomErrorHandler.NotFound("404 book is not found")
    }

    await BookSchema.findByIdAndDelete(reqID)

    res.status(201).json({
      message: "deleted book"
    })
  } catch (error) {
    next(error)
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