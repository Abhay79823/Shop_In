import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, stock } = req.body;

    const newProduct = new Product({ name, price, description, image, stock });
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create product' });
  }
};


