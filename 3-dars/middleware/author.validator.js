const CustomErrorHandler = require("../error/custom-error.handler")
const authorValidator = require("../validator/authors.validate")

module.exports = function(req, res, next){
  const {error} = authorValidator(req.body)

  if(error){
    throw CustomErrorHandler.BadRequest(error.message)
  }

  next()
}