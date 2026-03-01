const CustomErrorHandler = require("../error/custom-error.handler")
const jwt = require("jsonwebtoken")
const { access_token } = require("../utils/jwt")

module.exports = function (req, res, next){
  try {
    const authorization = req.cookies.refresh_token

    if(!authorization){
      throw CustomErrorHandler.UnAuthorithed("token is not defined")
    }

    const decode = jwt.verify(authorization, process.env.REFRESH_SECRET_KEY)

    const accessToken = access_token({
      id: decode._id, 
      role: decode.role, 
      email: decode.email
    })

    res.status(200).json({
      accessToken
    })
  } catch (error) {
    next(error)
  }
}