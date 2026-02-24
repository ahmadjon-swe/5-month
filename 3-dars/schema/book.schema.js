const {Schema, model} = require("mongoose")

const Book = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
    match: /^[a-zA-Z0-9\s\-\']+$/,
  },
  pages: {
    type: Number,
    required: true,
    min: [5, "minimal 5 ta varoq bo'lishi kerak"],
    max: [1500, "maksima 1500 ta varoqdan oshmasin"]
  },
  publishedYear: {
    type: Date,
    required: true,
    min: new Date("1900-01-01"),
    max: new Date()
  },
  publishedHome: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    minLength: 50,
    maxLength: [1400, "1400 ta harfdan oshmasin"]
  },
  genre: {
    type: String,
    required: true,
    enum: {
      values: [
        "Fiction",
        "Non-fiction",
        "Fantasy",
        "Science Fiction",
        "Mystery",
        "Thriller",
        "Romance",
        "Horror",
        "Historical Fiction",
        "Biography",
        "Autobiography",
        "Self-help",
        "Philosophy",
        "Psychology",
        "Poetry",
        "Drama",
        "Adventure",
        "Young Adult",
        "Children's Literature",
        "Classic",
        "Crime",
        "Dystopian",
        "Memoir",
        "Educational"
      ],
      message: "{VALUE} bunday qiymat qabul qilinmaydi"
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
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/localhost\/images\/[a-z0-9\-]+\.(jpg|jpeg|png|webp)$/i.test(v),
      message: "URL xato formatda"
    }
  },
  authorInfo: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "author"
  }
}, {
  versionKey: false,
  timestamps: true
})

const BookSchema = model("book", Book)

module.exports = BookSchema