const { getProducts, saveProducts } = require('../utils/s3');

exports.handler = async (event) => {
  try {
    const productId = parseInt(event.pathParameters.id);
    const updatedFields = JSON.parse(event.body);
    
    const data = await getProducts();
    const products = data.products || [];
    
    // Find the product index
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Product not found' })
      };
    }
    
    // Update the product with new fields, preserving the ID
    const updatedProduct = {
      ...products[productIndex],
      ...updatedFields,
      id: productId // Ensure ID remains unchanged
    };
    
    // Replace the product in the array
    products[productIndex] = updatedProduct;
    
    // Save updated products back to S3
    await saveProducts({ products });
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(updatedProduct)
    };
  } catch (error) {
    console.error('Error updating product:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Failed to update product' })
    };
  }
}; 