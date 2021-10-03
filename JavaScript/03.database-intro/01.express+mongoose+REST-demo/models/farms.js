const mongoose = require('mongoose');
const Product = require('./product');

const farmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Farm cant be nameless'],
  },
  city: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'email cant be empty'],
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

farmSchema.pre('findOneAndDelete', async function (farm) {
  console.log('farmSchema delete by ID pre middleware');
});

farmSchema.post('findOneAndDelete', async function (farm) {
  if (farm.products.length) {
    console.log(await Product.deleteMany({ _id: { $in: farm.products } }));
  }
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
