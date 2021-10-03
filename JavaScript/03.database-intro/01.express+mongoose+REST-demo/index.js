const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Product = require('./models/product');
const Farm = require('./models/farms');
const { dirname } = require('path');

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

// product routes -------------------------------------------------------------------------------------------

app.get('/products', async (req, res) => {
  const { category } = req.query;
  if (!category) {
    const allProducts = await Product.find({});
    res.render('products/allProducts', { allProducts });
  } else {
    const allProducts = await Product.find(req.query);
    res.render('products/allProducts', { allProducts });
  }
});

app.get('/products/new', (req, res) => {
  res.render('products/newProduct');
});

app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  res.render('products/product', { product });
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
  res.render('products/editProduct', { product });
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

// farm routes --------------------------------------------------------------------------------------------------

app.get('/farms', async (req, res) => {
  const allFarms = await Farm.find({});
  res.render('farms/allFarms', { allFarms });
});

app.get('/farms/new', (req, res) => {
  res.render('farms/newFarm');
});

app.get('/farms/:farmId', async (req, res) => {
  const { farmId } = req.params;
  const farm = await Farm.findById(farmId).populate('products');
  res.render('farms/farm', { farm });
});

app.post('/farms', async (req, res) => {
  const newFarm = req.body;
  const farm = new Farm(newFarm);
  await farm.save();
  res.redirect('/farms');
});

app.get('/farms/:farmId/edit', async (req, res) => {
  const { farmId } = req.params;
  const farm = await Farm.findById(farmId);
  res.render('farms/editFarm', { farm });
});

app.patch('/farms/:farmId', async (req, res) => {
  const { farmId } = req.params;
  const formData = req.body;
  let editedFarm = {};
  const farm = await Farm.findById(farmId);
  // console.log(farm);
  // console.log(formData);
  if (formData.name && formData.name !== farm.name)
    editedFarm.name = formData.name;
  if (formData.city && formData.city !== farm.city)
    editedFarm.city = formData.city;
  if (formData.email && formData.email !== farm.email)
    editedFarm.email = formData.email;
  // console.log(editedFarm);
  await Farm.findByIdAndUpdate(farmId, editedFarm, {
    runValidators: true,
  });
  res.redirect(`/farms/${farmId}`);
});

app.delete('/farms/:farmId', async (req, res) => {
  const { farmId } = req.params;
  await Farm.findByIdAndDelete(farmId);
  res.redirect('/farms');
});

app.get('/farms/:farmId/products/new', async (req, res) => {
  const { farmId } = req.params;
  const farm = await Farm.findById(farmId);
  res.render('farms/newProduct', { farm });
});

app.post('/:farmId/products', async (req, res) => {
  const { farmId } = req.params;
  const newProduct = req.body;
  const product = new Product(newProduct);
  await product.save();
  await Farm.findByIdAndUpdate(
    farmId,
    {
      $push: { products: product },
    },
    {
      runValidators: true,
    }
  );
  console.log(await Farm.findById(farmId));
  res.redirect(`/farms/${farmId}`);
});
