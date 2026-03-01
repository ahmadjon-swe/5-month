const joi = require("joi");

const bookValidator = (data) => {
  const schema = joi.object({
    title: joi.string().min(3).max(40).pattern(new RegExp(/^[a-zA-Z0-9\s\-'?,.()]+$/)).required(),
    pages: joi.number().integer().min(5).max(1500).required(),
    publishedYear: joi.date().min("1900-01-01").less("now").required(),
    publishedHome: joi.string().required(),
    period: joi.string().valid("Temuriylar davri", "Sovet davri", "Jadid davri", "Mustaqillik davri").required(),
    description: joi.string().min(50).max(1400).required(),
    genre: joi.string().valid("Fiction",
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
    "Educational").required(),
    imageUrl: joi.string().pattern(new RegExp(/^https?:\/\/localhost\/images\/[a-z0-9\-]+\.(jpg|jpeg|png|webp)$/i)).required(),
    // authorInfo chatGPT tavsiyasi asosida:
    authorInfo: joi.string().length(24).hex().required(),
  }); 

  return schema.validate(data)
};

module.exports = bookValidator;
