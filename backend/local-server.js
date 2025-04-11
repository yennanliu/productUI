const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Products data file path
const PRODUCTS_FILE = path.join(__dirname, 'sample-products.json');

// Utility to read products file
const getProductsData = () => {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products file:', error);
    return { products: [] };
  }
};

// Utility to write products file
const saveProductsData = (data) => {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing products file:', error);
  }
};

// GET all products
app.get('/products', (req, res) => {
  const data = getProductsData();
  res.json(data);
});

// GET product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const data = getProductsData();
  const product = data.products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

// POST new product
app.post('/products', (req, res) => {
  const newProduct = req.body;
  
  if (!newProduct.name || !newProduct.price) {
    return res.status(400).json({ error: 'Name and price are required fields' });
  }
  
  const data = getProductsData();
  const maxId = data.products.length > 0 
    ? Math.max(...data.products.map(p => p.id)) 
    : 0;
  
  const productWithId = {
    id: maxId + 1,
    ...newProduct
  };
  
  data.products.push(productWithId);
  saveProductsData(data);
  
  res.status(201).json(productWithId);
});

// PUT update product
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedFields = req.body;
  
  const data = getProductsData();
  const productIndex = data.products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const updatedProduct = {
    ...data.products[productIndex],
    ...updatedFields,
    id: productId
  };
  
  data.products[productIndex] = updatedProduct;
  saveProductsData(data);
  
  res.json(updatedProduct);
});

// DELETE product
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  
  const data = getProductsData();
  const productIndex = data.products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  data.products.splice(productIndex, 1);
  saveProductsData(data);
  
  res.status(204).end();
});

// Start server
app.listen(PORT, () => {
  console.log(`Local development server running at http://localhost:${PORT}`);
}); 