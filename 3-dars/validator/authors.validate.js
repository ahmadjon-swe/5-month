const joi = require("joi");

const authorValidator = (data) => {
  const schema = joi.object({
    fullname: joi.string().min(3).max(40).pattern(new RegExp(/^[a-zA-Z0-9\s\-'?,.()]+$/)).required(),
    birthDate: joi.date().min("1370-01-01").less("now").required(),
    deathDate: joi.string().required(),
    period: joi.string().valid("Temuriylar davri", "Sovet davri", "Jadid davri", "Mustaqillik davri").required(),
    bio: joi.string().min(50).max(1400).required(),
    work: joi.string().mim(15).max(1000).required(),
    imageUrl: joi.string().pattern(new RegExp(/^https?:\/\/localhost\/images\/[a-z0-9\-]+\.(jpg|jpeg|png|webp)$/i)).required(),
  }); 

  return schema.validate(data)
};

module.exports = authorValidator;
