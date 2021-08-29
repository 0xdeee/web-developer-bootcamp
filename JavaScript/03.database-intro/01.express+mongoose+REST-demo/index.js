const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose
  .connect('mongodb://localhost:27017/farmStandDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected'))
  .catch((error) => console.log(error));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.listen(8080, () => {
  console.log('app is listening to port 8080');
});

// routes

app.get('/products', async (req, res) => {
  const { category } = req.query;
  if (!category) {
    const allProducts = await Product.find({});
    // console.log(allProducts);
    res.render('allProducts', { allProducts });
  } else {
    const allProducts = await Product.find(req.query);
    res.render('allProducts', { allProducts });
  }
});

app.get('/products/new', (req, res) => {
  res.render('newProduct');
});

app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  res.render('product', { product });
});

app.post('/products', async (req, res) => {
  const newProduct = req.body;
  const product = new Product(newProduct);
  await product.save();
  res.redirect('/products');
});

app.get('/products/:productId/edit', async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  res.render('editProduct', { product });
});

app.patch('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const formData = req.body;
  let editedProduct = {};
  const product = await Product.findById(productId);
  // console.log(product);
  // console.log(formData);
  if (formData.name && formData.name !== product.name)
    editedProduct.name = formData.name;
  if (formData.price && formData.price !== product.price)
    editedProduct.price = formData.price;
  if (formData.category && formData.category !== product.category)
    editedProduct.category = formData.category;
  // console.log(editedProduct);
  await Product.findByIdAndUpdate(productId, editedProduct, {
    runValidators: true,
  });
  res.redirect(`/products/${productId}`);
});

app.delete('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  await Product.findByIdAndDelete(productId);
  res.redirect('/products');
});
