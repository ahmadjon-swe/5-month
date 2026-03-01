const CustomErrorHandler = require("../error/custom-error.handler")
const QuoteSchema = require("../schema/quote.schema")

// get_all ////////////////////////////////////////////////////////////////////////////////////
const getAllQuotes = async (req, res, next) => {
  try {
    const quotes = await QuoteSchema.find().populate("bookInfo", "-_id title genre authorInfo")

    if(!quotes){
      throw CustomErrorHandler.NotFound("404 quotes are not found")
    }

    res.status(200).json(quotes)
  } catch (error) {
    next(error)
  }
}


// get_one ////////////////////////////////////////////////////////////////////////////////////
const getOneQuote = async (req, res, next) => {
  try {
    const reqID = req.params.id
    const quote = await QuoteSchema.findById(reqID).populate("bookInfo")

    if(!quote){
      throw CustomErrorHandler.NotFound("404 quote is not found")
    }

    res.status(200).json(quote)
  } catch (error) {
    next(error)
  }
}

// getByBook ////////////////////////////////////////////////////////////////////////////////////
const getQuotesByBook = async (req, res, next) => {
  try {
    const bookID = req.query.bookID

    if(!bookID){
      throw CustomErrorHandler.BadRequest("bookID is required")
    }

    const quotes = await QuoteSchema.find({bookInfo: bookID}).populate("bookInfo", "-_id quoteText genre authorInfo")

    res.status(200).json(quotes)
  } catch (error) {
    next(error)
  }
}

// add ////////////////////////////////////////////////////////////////////////////////////
const addQuote = async (req, res, next) => {
  try {
    const {quoteText, bookInfo, pageNumber, addedBy}= req.body

    if(!quoteText || !bookInfo || !pageNumber){
      throw CustomErrorHandler.BadRequest("all fields must be filled in")
    }

    await QuoteSchema.create({quoteText, bookInfo, pageNumber, addedBy})

    res.status(201).json({
      message: "added new quote"
    })
  } catch (error) {
    next(error)
  }
}


// update ////////////////////////////////////////////////////////////////////////////////////
const updateQuote = async (req, res, next) => {
  try {
    const reqID = req.params.id
    const {quoteText, bookInfo, pageNumber, addedBy}= req.body

    const quote = await QuoteSchema.findById(reqID)

    if(!quote){
      throw CustomErrorHandler.NotFound("404 quote is not found")
    }
    
    await QuoteSchema.findByIdAndUpdate(reqID, {quoteText, bookInfo, pageNumber, addedBy})

    res.status(201).json({
      message: "updated quote"
    })
  } catch (error) {
    next(error)
  }
}


// delete ////////////////////////////////////////////////////////////////////////////////////
const deleteQuote = async (req, res, next) => {
  try {
    const reqID = req.params.id

    const quote = await QuoteSchema.findById(reqID)

    if(!quote){
      throw CustomErrorHandler.NotFound("404 quote is not found")
    }

    await QuoteSchema.findByIdAndDelete(reqID)

    res.status(201).json({
      message: "deleted quote"
    })
  } catch (error) {
    next(error)
  }
}


// EXPORT ////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  getAllQuotes,
  getOneQuote,
  getQuotesByBook,
  addQuote,
  updateQuote,
  deleteQuote
}