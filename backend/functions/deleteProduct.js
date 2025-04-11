const { getProducts, saveProducts } = require('../utils/s3');

exports.handler = async (event) => {
  try {
    const productId = parseInt(event.pathParameters.id);
    
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
    
    // Remove the product from the array
    products.splice(productIndex, 1);
    
    // Save updated products back to S3
    await saveProducts({ products });
    
    return {
      statusCode: 204, // No content
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Failed to delete product' })
    };
  }
}; 