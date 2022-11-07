const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const path = require('path');

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Connect DB
mongoose.connect("mongodb://localhost:27017/op_product")

// Routes
app.use("/api/products", productRoutes)
app.use("/api/auth", userRoutes)

app.listen(port, () => console.log(`Server listening on port ${port}`))
