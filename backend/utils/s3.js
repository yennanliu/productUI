const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// Get the products bucket name from environment variable
const BUCKET_NAME = process.env.PRODUCTS_BUCKET || 'product-data-dev';
const PRODUCTS_FILE = 'products.json';

// Get all products from S3
const getProducts = async () => {
  try {
    const data = await s3.getObject({
      Bucket: BUCKET_NAME,
      Key: PRODUCTS_FILE
    }).promise();

    return JSON.parse(data.Body.toString());
  } catch (error) {
    if (error.code === 'NoSuchKey') {
      // If the file doesn't exist, return empty products array
      return { products: [] };
    }
    throw error;
  }
};

// Save products to S3
const saveProducts = async (products) => {
  await s3.putObject({
    Bucket: BUCKET_NAME,
    Key: PRODUCTS_FILE,
    Body: JSON.stringify(products, null, 2),
    ContentType: 'application/json'
  }).promise();
};

module.exports = {
  getProducts,
  saveProducts,
  BUCKET_NAME
}; 