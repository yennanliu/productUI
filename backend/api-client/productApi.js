import axios from 'axios';

// Base URL of the deployed API
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'https://your-api-id.execute-api.us-east-1.amazonaws.com/dev';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default {
  // Get all products
  getProducts() {
    return apiClient.get('/products');
  },
  
  // Get a single product by ID
  getProduct(id) {
    return apiClient.get(`/products/${id}`);
  },
  
  // Create a new product
  createProduct(product) {
    return apiClient.post('/products', product);
  },
  
  // Update an existing product
  updateProduct(id, product) {
    return apiClient.put(`/products/${id}`, product);
  },
  
  // Delete a product
  deleteProduct(id) {
    return apiClient.delete(`/products/${id}`);
  }
}; 