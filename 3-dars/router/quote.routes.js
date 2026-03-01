const {Router} = require("express")
const quoteValidator = require("../middleware/quote.validator")
const { getQuotesByBook, getAllQuotes, addQuote, getOneQuote, updateQuote, deleteQuote } = require("../controller/quote.controller")

const quoteRouter = Router()

quoteRouter.get("/get_all_quotes", getAllQuotes)
quoteRouter.get("/get_quotes_by_book", getQuotesByBook)
quoteRouter.get("/get_one_quote/:id", getOneQuote)
quoteRouter.post("/add_quote", quoteValidator,addQuote)
quoteRouter.put("/update_quote/:id", updateQuote)
quoteRouter.delete("/delete_quote/:id", deleteQuote)

module.exports = quoteRouter