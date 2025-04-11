const { getProducts, saveProducts } = require('../utils/s3');
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
  try {
    const data = await getProducts();
    const products = data.products || [];
    
    const newProduct = JSON.parse(event.body);
    
    // Validate required fields
    if (!newProduct.name || !newProduct.price) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Name and price are required fields' })
      };
    }
    
    // Generate a new ID (either use the highest existing ID + 1 or start at 1)
    const maxId = products.length > 0 
      ? Math.max(...products.map(p => p.id)) 
      : 0;
    
    const productWithId = {
      id: maxId + 1,
      ...newProduct
    };
    
    // Add the new product to the array
    products.push(productWithId);
    
    // Save updated products back to S3
    await saveProducts({ products });
    
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(productWithId)
    };
  } catch (error) {
    console.error('Error creating product:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Failed to create product' })
    };
  }
}; 