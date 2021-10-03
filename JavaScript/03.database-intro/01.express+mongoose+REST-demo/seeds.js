const mongoose = require('mongoose');
const { db } = require('./models/product');
const Product = require('./models/product');

mongoose
  .connect('mongodb://localhost:27017/farmStandDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected'))
  .catch((error) => console.log(error));

const seedData = [
  {
    name: 'carrots',
    price: 2.99,
    category: 'vegetable',
  },
  {
    name: 'peas',
    price: 5,
    category: 'vegetable',
  },
  {
    name: 'apple',
    price: 10.5,
    category: 'fruit',
  },
  {
    name: 'ghee',
    price: 20,
    category: 'dairy',
  },
  {
    name: 'pomegranate',
    price: 8.99,
    category: 'fruit',
  },
];

Product.deleteMany({})
  .then(() => {
    Product.insertMany(seedData)
      .then((res) => {
        console.log(res);
        db.close();
      })
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));
