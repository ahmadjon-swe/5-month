const {Schema, model} = require("mongoose")

const Quote = new Schema({
  quoteText: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 500,
    match: /^[a-zA-Z0-9\s\-'?,.()]+$/,
  },
  pageNumber: {
    type: Number,
    required: true
  },
  bookInfo: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "book"
  },
  // qo'shgan xodim bo'lsa o'shani id'si
  addedBy: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: "staff"
  }
}, {
  versionKey: false,
  timestamps: true
})

const QuoteSchema = model("quote", Quote)

module.exports = QuoteSchema