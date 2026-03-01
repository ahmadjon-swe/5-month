const CustomErrorHandler = require("../error/custom-error.handler")
const jwt = require("jsonwebtoken")

module.exports = function (req, res, next){
  try {
    const authorization = req.headers.authorization

    if(!authorization){
      throw CustomErrorHandler.UnAuthorithed("token is not defined")
    }

    const {Bearer, token} = authorization.split(" ")

    if(Bearer!== "Bearer" || !token){
      throw CustomErrorHandler.UnAuthorithed("Bearer token required")
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY)
    req["user"] = decode

    next()
  } catch (error) {
    // Bu yerda ERROR controllerga yuborilib,
    // keyin error.middlewarega boradimi?
    next(error)
  }
}