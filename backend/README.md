# Product Backend API

A serverless backend for the Product UI application, using:
- AWS Lambda for serverless functions
- Amazon S3 for product data storage
- AWS API Gateway for API endpoints
- AWS CloudFormation for infrastructure deployment

## API Endpoints

| Method | Endpoint       | Description                  |
|--------|----------------|------------------------------|
| GET    | /products      | Get all products             |
| GET    | /products/{id} | Get a product by ID          |
| POST   | /products      | Create a new product         |
| PUT    | /products/{id} | Update an existing product   |
| DELETE | /products/{id} | Delete a product             |

## Prerequisites

- [AWS CLI](https://aws.amazon.com/cli/) installed and configured
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) installed
- An S3 bucket for CloudFormation template deployment (or use the full deployment script to create one automatically)

## Setup Instructions

1. Install dependencies:
```
npm install
```

2. Deploy to AWS using CloudFormation:

### Option 1: Full Automatic Deployment
This option creates a deployment bucket for you and initializes the product data:

```
# Deploy to development environment
npm run deploy:full:dev

# Deploy to production environment
npm run deploy:full:prod
```

### Option 2: Manual Deployment
This option requires you to specify an existing S3 bucket:

```
# Create an S3 bucket for your deployment if you don't have one
aws s3 mb s3://my-deployment-bucket

# Deploy to development
npm run deploy:dev -- --s3-bucket my-deployment-bucket

# Deploy to production
npm run deploy:prod -- --s3-bucket my-deployment-bucket
```

## Local Development

To test locally without deploying to AWS:

```
# Start the Express server for local testing
npm run dev
```

To test using AWS SAM Local:

```
# Start a local API Gateway
npm run local:api
```

## Cleaning Up Resources

To delete the CloudFormation stack when no longer needed:

```
# Delete the stack
npm run cleanup

# Delete the stack and empty the S3 bucket first
npm run cleanup:all
```

## Product Data Format

```json
{
  "id": 1,
  "name": "Product Name",
  "price": 99.99,
  "image": "product1.jpg",
  "category": "Category",
  "features": ["Feature 1", "Feature 2", "Feature 3"]
}
``` 