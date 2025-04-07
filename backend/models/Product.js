// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  description: { type: String },
  stock: { type: Number, default: 0 },
});

const Product = mongoose.model('Product', productSchema);
export default Product;

