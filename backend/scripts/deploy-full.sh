#!/bin/bash

# Full deployment script for Product API CloudFormation stack

# Default values
STACK_NAME="product-api"
STAGE="dev"
REGION="us-east-1"
DEPLOYMENT_BUCKET="product-api-deployments"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --stack-name)
      STACK_NAME="$2"
      shift 2
      ;;
    --stage)
      STAGE="$2"
      shift 2
      ;;
    --region)
      REGION="$2"
      shift 2
      ;;
    --bucket)
      DEPLOYMENT_BUCKET="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Set AWS region
export AWS_DEFAULT_REGION=$REGION

# Create deployment bucket if it doesn't exist
echo "=== Checking if deployment bucket exists: $DEPLOYMENT_BUCKET ==="
if ! aws s3 ls "s3://$DEPLOYMENT_BUCKET" 2>&1 > /dev/null; then
  echo "Creating deployment bucket: $DEPLOYMENT_BUCKET"
  aws s3 mb "s3://$DEPLOYMENT_BUCKET" --region $REGION
  
  # Wait for bucket to be available
  echo "Waiting for bucket to be available..."
  sleep 5
else
  echo "Deployment bucket already exists: $DEPLOYMENT_BUCKET"
fi

# Execute the deployment script with the deployment bucket
echo "=== Starting deployment ==="
./scripts/deploy.sh --stack-name $STACK_NAME \
                    --stage $STAGE \
                    --region $REGION \
                    --s3-bucket $DEPLOYMENT_BUCKET

# Set up full initialization
echo "=== Setting up initialization ==="
export FORCE_INIT=true

# Get CloudFormation outputs for the S3 bucket
echo "=== Getting CloudFormation outputs ==="
BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='ProductsBucketName'].OutputValue" --output text)
API_URL=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" --output text)

# Force initialization of the products bucket
if [ -n "$BUCKET_NAME" ]; then
  echo "=== Initializing product data in S3 bucket: $BUCKET_NAME ==="
  PRODUCTS_BUCKET=$BUCKET_NAME node scripts/init-s3.js
else
  echo "=== Failed to get bucket name from CloudFormation outputs ==="
  exit 1
fi

echo "=== Deployment Complete ==="
echo "API URL: $API_URL"
echo "S3 Bucket: $BUCKET_NAME"
echo "Stack Name: $STACK_NAME"
echo "Stage: $STAGE"
echo ""
echo "To test the API, try:"
echo "curl $API_URL/products" 