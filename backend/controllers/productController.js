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
  const { name, description, price, inStock } = JSON.parse(req.body.product)
  const product = await ProductModel.create({ 
    name, 
    description, 
    price, 
    inStock,
    imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ''
  })

  res.json(product)
}

const updateProduct = async (req, res) => {
  const product = req.file ? {
    ...JSON.parse(req.body.product),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body }

  await ProductModel.findByIdAndUpdate(req.params.id, product)

  res.json({ message: 'Modified!' })
}

const deleteProduct = async (req, res) => {
  const productToDelete = await ProductModel.findById(req.params.id)

  if(productToDelete) {
    const filename = productToDelete.imageUrl.split('/images/')[1]
    fs.unlink(`public/images/${filename}`, async () => {
      await ProductModel.deleteOne({_id: req.params.id})
      res.json({ message: 'Deleted!' })
    })
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
