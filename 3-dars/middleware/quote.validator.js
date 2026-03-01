const CustomErrorHandler = require("../error/custom-error.handler")
const quoteValidator = require("../validator/quote.validate")

module.exports = function(req, res, next){
  const {error} = quoteValidator(req.body)

  if(error){
    throw CustomErrorHandler.BadRequest(error.message)
  }

  next()
}