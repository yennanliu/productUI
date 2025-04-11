# Product Backend API

A serverless backend for the Product UI application, using:
- AWS Lambda for serverless functions
- Amazon S3 for product data storage
- AWS API Gateway for API endpoints

## API Endpoints

| Method | Endpoint       | Description                  |
|--------|----------------|------------------------------|
| GET    | /products      | Get all products             |
| GET    | /products/{id} | Get a product by ID          |
| POST   | /products      | Create a new product         |
| PUT    | /products/{id} | Update an existing product   |
| DELETE | /products/{id} | Delete a product             |

## Setup Instructions

1. Install dependencies:
```
npm install
```

2. Deploy to AWS:
```
npm run deploy
```

## Local Development

To test locally, you can use the AWS SAM CLI:

```
sam local start-api
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