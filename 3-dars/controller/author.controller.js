const AuthorSchema = require("../schema/author.schema")

// get_all ////////////////////////////////////////////////////////////////////////////////////
const getAllAuthors = async (req, res) => {
  try {
    const authors = await AuthorSchema.find()

    if(!authors){
      return res.status(404).json({
        message: "404 authors are not found"
      })
    }

    res.status(200).json(authors)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


// get_one ////////////////////////////////////////////////////////////////////////////////////
const getOneAuthor = async (req, res) => {
  try {
    const reqID = req.params.id
    const author = await AuthorSchema.findById(reqID)

    if(!author){
      return res.status(404).json({
        message: "404 author is not found"
      })
    }

    res.status(200).json(author)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


// add ////////////////////////////////////////////////////////////////////////////////////
const addAuthor = async (req, res) => {
  try {
    const {fullname, birthDate, deathDate, period, bio, work, imageUrl}= req.body

    if(!fullname || !birthDate || !deathDate || !period || !bio || !work || !imageUrl){
      return res.status(400).json({
        message: "all fields must be filled in"
      })
    }

    await AuthorSchema.create({fullname, birthDate, deathDate, period, bio, work, imageUrl})

    res.status(201).json({
      message: "added new author"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


// update ////////////////////////////////////////////////////////////////////////////////////
const updateAuthor = async (req, res) => {
  try {
    const reqID = req.params.id
    const {fullname, birthDate, deathDate, period, bio, work, imageUrl}= req.body

    const author = await AuthorSchema.findById(reqID)

    if(!author){
      return res.status(404).json({
        message: "404 author is not found"
      })
    }
    
    await AuthorSchema.findByIdAndUpdate(reqID, {fullname, birthDate, deathDate, period, bio, work, imageUrl})

    res.status(201).json({
      message: "updated author"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


// delete ////////////////////////////////////////////////////////////////////////////////////
const deleteAuthor = async (req, res) => {
  try {
    const reqID = req.params.id

    const author = await AuthorSchema.findById(reqID)

    if(!author){
      return res.status(404).json({
        message: "404 author is not found"
      })
    }

    await AuthorSchema.findByIdAndDelete(reqID)

    res.status(201).json({
      message: "deleted author"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


// EXPORT ////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  getAllAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor
}