const ProductModel = require('../models/Product')
const fs = require('fs')

const getProducts = async (req, res) => {
  const products = await ProductModel.find()

  res.json(products)
}

const getProduct = async (req, res) => {  
  const product = await ProductModel.findById(req.params.id)

  res.json(product)
}

const createProduct = async (req, res) => {
  const { name, description, price, inStock } = req.body.product
  const product = await ProductModel.create({ 
    name, 
    description, 
    price, 
    inStock,
    imageUrl: req.file ? `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}` : ''
  })

  res.json({ product })
}

const updateProduct = async (req, res) => {
  const { name, description, price, inStock } = req.body
  await ProductModel.findByIdAndUpdate(req.params.id, { 
    name, 
    description, 
    price, 
    inStock,
    imageUrl: req.file ? `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}` : ''
  })

  res.json({ message: 'Modified!' })
}

const deleteProduct = async (req, res) => {
  const productToDelete = await ProductModel.findById(req.params.id)
  const filename = productToDelete.imageUrl.split('/public/images/')[1]
  fs.unlink(`public/images/${filename}`, async () => {
    await ProductModel.deleteOne(req.params.id)
    res.json({ message: 'Deleted!' })
  })
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
