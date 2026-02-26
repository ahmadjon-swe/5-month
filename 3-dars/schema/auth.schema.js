const {Schema, model} = require("mongoose")

const Auth = new Schema({
  username: {
    type: String,
    required: true,
    match: /^[a-zA-Z]+$/,
    unique: true
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  role: {
    type: String,
    default: "user"
  },
  otp: {
    type: String,
    required: true
  },
  otpTime: {
    type: Number,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

const AuthSchema = model("auth", Auth)

module.exports = AuthSchema