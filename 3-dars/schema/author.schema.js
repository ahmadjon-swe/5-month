const {Schema, model} = require("mongoose")

const Author = new Schema({
  fullname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
    match: /^[a-zA-Z\s\-\']+$/,
    // birinchi harfni kattalashtiriadi:
    set: (v)=> v.trim().split(" ").map(str=>str[0].toUpperCase()+str.slice(1)).join(" ")
  },
  birthDate: {
    type: Date,
    required: true,
    min: new Date("1370-01-01"),
    max: Date.now
  },
  deathDate: {
    type: String,
    required: true,
    validate: {
      validator: ((v)=> v === "hayot" || new Date(v) < new Date() && /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(v)),
      message: "deathDate kelajakda bo'lolmaydi!"
    }
  },
  period: {
    type: String,
    required: true,
    enum: {
      values: ["Temuriylar davri", "Sovet davri", "Jadid davri", "Mustaqillik davri"],
      message: "{VALUE} bunday qiymat qabul qilinmaydi"
    }
  },
  bio: {
    type: String,
    required: true,
    minLength: 50,
    maxLength: [1400, "maksimal 1400 ta harf bo'lsin"]
  },
  work: {
    type: String,
    required: true,
    minLength: [15, "minimum 40 ta harf bo'lsin"],
    maxLength: [1000, "bu biografiya emas"]
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/localhost\/images\/[a-z0-9\-]+\.(jpg|jpeg|png|webp)$/i.test(v),
      message: "URL xato formatda"
    }
  }
}, {
  versionKey: false,
  timestamps: true
})

const AuthorSchema = model("author", Author)

module.exports = AuthorSchema