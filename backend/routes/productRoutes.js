const express = require('express')
const router = express.Router()
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')

router
  .route("/")
  .get(getProducts)
  .post(multer, createProduct)
router
  .route("/:id")
  .get(getProduct)
  .put(multer, updateProduct)
  .delete(deleteProduct)

module.exports = router
