const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Create S3 client
const s3 = new AWS.S3({ region: 'us-east-1' });

// Set bucket name - modify this based on your deployment stage
const BUCKET_NAME = process.env.PRODUCTS_BUCKET || 'product-data-dev';
const PRODUCTS_FILE = 'products.json';

// Read the sample products file
const sampleProducts = require('../sample-products.json');

async function initS3() {
  try {
    console.log(`Initializing S3 bucket: ${BUCKET_NAME} with sample product data...`);
    
    // Check if bucket exists, if not create it
    try {
      await s3.headBucket({ Bucket: BUCKET_NAME }).promise();
      console.log(`Bucket ${BUCKET_NAME} exists.`);
    } catch (error) {
      if (error.code === 'NotFound') {
        console.log(`Creating bucket ${BUCKET_NAME}...`);
        await s3.createBucket({ Bucket: BUCKET_NAME }).promise();
        console.log(`Bucket ${BUCKET_NAME} created.`);
      } else {
        throw error;
      }
    }
    
    // Upload sample products to S3
    await s3.putObject({
      Bucket: BUCKET_NAME,
      Key: PRODUCTS_FILE,
      Body: JSON.stringify(sampleProducts, null, 2),
      ContentType: 'application/json'
    }).promise();
    
    console.log(`Sample product data uploaded to s3://${BUCKET_NAME}/${PRODUCTS_FILE}`);
  } catch (error) {
    console.error('Error initializing S3:', error);
  }
}

// Run the initialization
initS3(); 