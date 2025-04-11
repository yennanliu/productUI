#!/bin/bash

# CloudFormation deployment script for Product API

# Default values
STACK_NAME="product-api"
STAGE="dev"
REGION="us-east-1"
S3_BUCKET=""
S3_PREFIX="deployments"

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
    --s3-bucket)
      S3_BUCKET="$2"
      shift 2
      ;;
    --s3-prefix)
      S3_PREFIX="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Check if S3 bucket is provided
if [ -z "$S3_BUCKET" ]; then
  echo "Error: S3 bucket is required for deployment."
  echo "Usage: ./deploy.sh --s3-bucket <bucket-name> [--stack-name <name>] [--stage <stage>] [--region <region>]"
  exit 1
fi

# Set AWS region
export AWS_DEFAULT_REGION=$REGION

# Build and package the application
echo "=== Packaging application ==="
sam package \
  --template-file template.yaml \
  --output-template-file packaged.yaml \
  --s3-bucket $S3_BUCKET \
  --s3-prefix $S3_PREFIX

# Deploy the application
echo "=== Deploying stack $STACK_NAME ($STAGE) ==="
sam deploy \
  --template-file packaged.yaml \
  --stack-name $STACK_NAME \
  --parameter-overrides Stage=$STAGE \
  --capabilities CAPABILITY_IAM \
  --no-fail-on-empty-changeset

# Get the API endpoint URL from the stack outputs
API_URL=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" --output text)
BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='ProductsBucketName'].OutputValue" --output text)

echo "=== Deployment completed ==="
echo "API Endpoint: $API_URL"
echo "S3 Bucket: $BUCKET_NAME"

# Set environment variables for initialization script
export PRODUCTS_BUCKET=$BUCKET_NAME

# Run the S3 initialization script if the bucket was created
if [ -n "$BUCKET_NAME" ]; then
  echo "=== Initializing S3 bucket with sample data ==="
  node scripts/init-s3.js
fi

echo "=== All done! ===" 