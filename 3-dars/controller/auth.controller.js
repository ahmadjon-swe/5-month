const CustomErrorHandler = require("../error/custom-error.handler")
const AuthSchema = require("../schema/auth.schema")
const bcrypt = require("bcryptjs")
const sendMessage = require("../utils/send-email")
const { access_token, refresh_token } = require("../utils/jwt")

// REGISTER ///////////////////////////////////////////////////////////////////////////////////
const register = async (req, res, next) => {
  try {
    const {username, email, password, refreshToken} = req.body
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
      otpTime: Date.now()+120000,
    })

    res.status(200).json({message: "register"})
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
    
    const accessToken = access_token({id: foundedEmail._id, role: foundedEmail.role, email: foundedEmail.email}) 
    const refreshToken = refresh_token({id: foundedEmail._id, role: foundedEmail.role, email: foundedEmail.email}) 

    await AuthSchema.findByIdAndUpdate(foundedEmail._id, {refreshToken})

    res.cookie("refresh_token", 
      refreshToken, {
        httpsOnly: true, // XSS(CROSS-SITE SCRIPTING)
        secure: true, //https
        sameSite: "strict", // CSRF(CROSS-SITE REQUEST FORGERY)
        maxAge: 15 * 60 * 1000
      }
    )

    res.status(200).json({
      message: "success",
      accessToken
    })
  } catch (error) {
    next(error)
  }
}


// LOGIN ///////////////////////////////////////////////////////////////////////////////////
const login = async (req, res, next) => {
  try {
    const {email, password} = req.body
    const foundedEmail = await AuthSchema.findOne({email})

    if(!foundedEmail){
      throw CustomErrorHandler.NotFound("user not found")
    }

    const check = await bcrypt.compare(password, foundedEmail.password)

    if(check){
      const code = Array.from({length: 6}, ()=>Math.round(Math.random()*6)).join("")
  
      await sendMessage(code, email)
  
      await AuthSchema.findByIdAndUpdate(foundedEmail._id, {
        otp: code,
        otpTime: Date.now()+120000
      })
  
      res.status(200).json({message: "please check your email"})
    } else {
      throw CustomErrorHandler.BadRequest("wrong password")
    }

  } catch (error) {
    next(error)
  }
}

// LOGOUT ///////////////////////////////////////////////////////////////////////////////////
const logout = async (req, res, next) => {
  try {
    const foundedEmail = await req["user"].email

    if(!foundedEmail){
      throw CustomErrorHandler.NotFound("user not found")
    }

    await AuthSchema.findByIdAndUpdate(foundedEmail._id, {
      refreshToken: ""
    })

    res.clearCookie("refresh_token")
    res.status(200).json({message: "Logged out"})

  } catch (error) {
    next(error)
  }
}

// VERIFY & DELETE ///////////////////////////////////////////////////////////////////////////////////
const verifyAndDelete = async (req, res, next) => {
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

    await AuthSchema.findByIdAndDelete(foundedEmail._id)

    res.clearCookie("refresh_token")

    res.status(200).json({
      message: "account is successfully deleted"
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  verify,
  login,
  logout,
  verifyAndDelete
}