const {Router} = require("express")
const { getAllProducts, addProduct, updateProduct, deleteProduct, getOneProduct } = require("../controller/gallery.controller")
const upload = require("../middleware/upload")


const galleryRouter = Router()

// CRUD product
galleryRouter.get("/get_all_products", getAllProducts)
galleryRouter.get("/get_one_product/:id", getOneProduct)
galleryRouter.post("/add_product",upload.single("image"), addProduct)
galleryRouter.put("/update_product/:id",upload.single("image"), updateProduct)
galleryRouter.delete("/delete_product/:id", deleteProduct)

module.exports = galleryRouter