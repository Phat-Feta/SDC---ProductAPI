const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true, useUnifiedTopology: true });

let productSchema = mongoose.Schema({
  productId: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: Array,
  styles: Array,
  related: String,
});

// compiling schema into a Model
let Product = mongoose.model('Product', productSchema);