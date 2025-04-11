const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Get the AWS region from environment or use default
const REGION = process.env.AWS_DEFAULT_REGION || 'us-east-1';

// Create S3 client
const s3 = new AWS.S3({ region: REGION });

// Get bucket name from environment variable or CloudFormation output
const BUCKET_NAME = process.env.PRODUCTS_BUCKET || 'product-data-dev';
const PRODUCTS_FILE = 'products.json';

// Read the sample products file
const sampleProductsPath = path.join(__dirname, '..', 'sample-products.json');
let sampleProducts;

try {
  const data = fs.readFileSync(sampleProductsPath, 'utf8');
  sampleProducts = JSON.parse(data);
  console.log('Successfully loaded sample products from file.');
} catch (error) {
  console.error('Error reading sample products file:', error);
  process.exit(1);
}

async function initS3() {
  try {
    console.log(`Initializing S3 bucket: ${BUCKET_NAME} with sample product data...`);
    
    // Check if bucket exists
    try {
      await s3.headBucket({ Bucket: BUCKET_NAME }).promise();
      console.log(`Bucket ${BUCKET_NAME} exists.`);
    } catch (error) {
      console.error(`Error accessing bucket ${BUCKET_NAME}:`, error.code);
      console.error('Please make sure the bucket exists and you have the correct permissions.');
      process.exit(1);
    }
    
    // Check if products file already exists
    try {
      await s3.headObject({
        Bucket: BUCKET_NAME,
        Key: PRODUCTS_FILE
      }).promise();
      
      console.log(`${PRODUCTS_FILE} already exists in bucket. Checking if it should be overwritten...`);
      
      // Only overwrite if FORCE_INIT is set
      if (process.env.FORCE_INIT === 'true') {
        console.log('FORCE_INIT=true, overwriting existing file.');
      } else {
        console.log('Skipping initialization as file already exists. Use FORCE_INIT=true to overwrite.');
        return;
      }
    } catch (error) {
      if (error.code !== 'NotFound') {
        throw error;
      }
      // File doesn't exist, continue with upload
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
    process.exit(1);
  }
}

// Run the initialization
initS3(); 