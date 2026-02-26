const CustomErrorHandler = require("../error/custom-error.handler")
const AuthSchema = require("../schema/auth.schema")
const bxrypt = require("bcryptjs")
const sendMessage = require("../utils/send-email")
const { access_token } = require("../utils/jwt")

// REGISTER ///////////////////////////////////////////////////////////////////////////////////
const register = async (req, res, next) => {
  try {
    const {username, email, password} = req.body
    const foundedEmail = await AuthSchema.findOne({email})
    const foundedUsername = await AuthSchema.findOne({username})

    if(foundedEmail || foundedUsername){
      throw CustomErrorHandler.BadRequest("user already exist")
    }

    const hash = await bcrypt.hash(password, 12)

    const code = Array.from({length: 6}, ()=>Math.round(Math.random()*6)).join("")

    await sendMessage(code, email)

    await AuthSchema.create({
      username,
      email,
      password: hash,
      otp: code,
      otpTime: Date.now()+120000
    })

    res.status(200).json({meesage: "register"})
  } catch (error) {
    next(error)
  }
}

// VERIFY ///////////////////////////////////////////////////////////////////////////////////
const verify = async (req, res, next) => {
  try {
    const {email, code} = req.body
    const foundedEmail = await AuthSchema.findOne({email})

    if(!foundedEmail){
      throw CustomErrorHandler.NotFound("404 user not found")
    }

    if(!foundedEmail.otp){
      throw CustomErrorHandler.UnAuthorithed("404 otp not found")
    }

    if(foundedEmail.otp != code){
      throw CustomErrorHandler.UnAuthorithed("wrong otp")
    }

    if(foundedEmail.otpTime < Date.now()){
      throw CustomErrorHandler.UnAuthorithed("otp expired")
    }

    await AuthSchema.findByIdAndUpdate(foundedEmail._id, {otp: "", otpTime: 0})

    const token = access_token({id: foundedEmail._id, role: foundedEmail.role, email: foundedEmail.email}) 
    res.cookie("access_token", token, {maxAge: 15 * 60 * 1000, httpsOnly: true})

    res.status(200).json({
      meesage: "success",
      token
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  verify
}