const joi = require("joi");

const quoteValidator = (data) => {
  const schema = joi.object({
    quoteText: joi.string().min(3).max(500).pattern(new RegExp(/^[a-zA-Z0-9\s\-'?,.()]+$/)).required(),
    pageNumber: joi.number().integer().required(),
    bookInfo: joi.string().length(24).hex().required(),
    addedBy: joi.string().length(24).hex()
  }); 

  return schema.validate(data)
};

module.exports = quoteValidator;