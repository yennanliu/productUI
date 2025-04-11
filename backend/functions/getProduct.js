const { getProducts } = require('../utils/s3');

exports.handler = async (event) => {
  try {
    const productId = parseInt(event.pathParameters.id);
    const data = await getProducts();
    
    const product = data.products.find(p => p.id === productId);
    
    if (!product) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Product not found' })
      };
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(product)
    };
  } catch (error) {
    console.error('Error getting product:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Failed to get product' })
    };
  }
}; 