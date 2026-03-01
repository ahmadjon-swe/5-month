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
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    type: String,
    required: true,
    min: 6
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
  },
  refreshToken: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
})

const AuthSchema = model("auth", Auth)

module.exports = AuthSchema