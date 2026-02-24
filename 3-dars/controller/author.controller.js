const CustomErrorHandler = require("../error/custom-error.handler")
const AuthorSchema = require("../schema/author.schema")

// get_all ////////////////////////////////////////////////////////////////////////////////////
const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await AuthorSchema.find()

    if(!authors){
      throw CustomErrorHandler.NotFound("404 authors are not found")
    }

    res.status(200).json(authors)
  } catch (error) {
    next(error)
  }
}

// search ////////////////////////////////////////////////////////////////////////////////////
const search = async (req, res, next) => {
  try {
    const {searchingValue} = req.query
    const result = await AuthorSchema.find({
      fullname: {$regex: searchingValue, $options: "i"}
    })

    if(!result.length){
      throw CustomErrorHandler.NotFound("404 authors are not found")
    }

    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}


// get_one ////////////////////////////////////////////////////////////////////////////////////
const getOneAuthor = async (req, res, next) => {
  try {
    const reqID = req.params.id
    const author = await AuthorSchema.findById(reqID)

    if(!author){
      throw CustomErrorHandler.NotFound("404 authors are not found")
    }

    res.status(200).json(author)
  } catch (error) {
    next(error)
  }
}


// add ////////////////////////////////////////////////////////////////////////////////////
const addAuthor = async (req, res, next) => {
  try {
    const {fullname, birthDate, deathDate, period, bio, work, imageUrl}= req.body

    if(!fullname || !birthDate || !deathDate || !period || !bio || !work || !imageUrl){
      throw CustomErrorHandler.BadRequest("all fields must be filled in")
    }

    await AuthorSchema.create({fullname, birthDate, deathDate, period, bio, work, imageUrl})

    res.status(201).json({
      message: "added new author"
    })
  } catch (error) {
    next(error)
  }
}


// update ////////////////////////////////////////////////////////////////////////////////////
const updateAuthor = async (req, res, next) => {
  try {
    const reqID = req.params.id
    const {fullname, birthDate, deathDate, period, bio, work, imageUrl}= req.body

    const author = await AuthorSchema.findById(reqID)

    if(!author){
      throw CustomErrorHandler.NotFound("404 authors are not found")
    }
    
    await AuthorSchema.findByIdAndUpdate(reqID, {fullname, birthDate, deathDate, period, bio, work, imageUrl})

    res.status(201).json({
      message: "updated author"
    })
  } catch (error) {
    next(error)
  }
}


// delete ////////////////////////////////////////////////////////////////////////////////////
const deleteAuthor = async (req, res, next) => {
  try {
    const reqID = req.params.id

    const author = await AuthorSchema.findById(reqID)

    if(!author){
      throw CustomErrorHandler.NotFound("404 authors are not found")
    }

    await AuthorSchema.findByIdAndDelete(reqID)

    res.status(201).json({
      message: "deleted author"
    })
  } catch (error) {
    next(error)
  }
}


// EXPORT ////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  getAllAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  search
}