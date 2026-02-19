const {read_file, write_file} = require("../api/file-system");
const {v4} = require("uuid");
const fs = require("fs");

// get_all ////////////////////////////////////////////////////////////////////////////////////

const getAllImages = async (req, res) => {
  try {
    const images = read_file("gallery.json");
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get_one ////////////////////////////////////////////////////////////////////////////////////

const getOneImage = async (req, res) => {
  try {
    const reqID = req.params.id;
    const image = read_file("gallery.json").find((v) => v.id === reqID);

    if (!image) {
      return res.status(404).json({
        message: "404 something is wrong",
      });
    }
    
    res.status(200).json(image);
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// add_one ////////////////////////////////////////////////////////////////////////////////////

const addImage = async (req, res) => {
  try {
    const {name} = req.body;
    const products = read_file("products.json");

    if (!name || !req.file) {
      return res.status(401).json({
        message: "name and images are required",
      });
    }

    products.push({
      id: v4(),
      name,
      date: new Date().toISOString(),
      size: req.file.size,
      filename: req.file.filename,
    });

    write_file("products.json", products);
    res.status(201).json({
      message: `${name} is successfully added`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// update_one ////////////////////////////////////////////////////////////////////////////////////

const updateImage = async (req, res) => {
  try {
    const reqID = req.params.id;
    const {name} = req.body;
    const images = read_file("gallery.json");
    const idx = images.findIndex((v) => v.id === reqID);

    if (!name && !req.file) {
      return res.status(401).json({
        message: "name or image required",
      });
    }

    if (idx === -1) {
      return res.status(404).json({
        message: "404 image was not found",
      });
    }

    for (const v of images) {
      if (v.id === reqID) {
        v.name = name ?? v.name;
        if (req.file) {
          try{
            await fs.unlink(`images/${v.filename}`);
          }catch(error){
              console.log("old image didn't found or deleted")
          }
          v.date = new Date().toISOString()
          v.size = req.file.size
          v.filename = req.file.filename
        }
      }
    }

    write_file("gallery.json", images);
    res.status(201).json({
      message: `image is successfully updated`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// delete_one ////////////////////////////////////////////////////////////////////////////////////

const deleteImage = async (req, res) => {
  try {
    const reqID = req.params.id;
    const images = read_file("gallery.json");
    const idx = images.findIndex((v) => v.id === reqID);

    if (idx === -1) {
      return res.status(404).json({
        message: "404 image was not found",
      });
    }



    try{
      await fs.unlink(`images/${images[idx]["filename"]}`);
    }catch(error){
      console.log("old image didn't found or deleted")
    }

    images.splice(idx, 1);
    write_file("gallery.json", images);
    res.status(201).json({
      message: `image is successfully deleted`,
    });
    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// EXPORTS ////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  getAllImages,
  getOneImage,
  addImage,
  updateImage,
  deleteImage,
};
