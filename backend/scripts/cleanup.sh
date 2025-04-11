#!/bin/bash

# CloudFormation stack cleanup script

# Default values
STACK_NAME="product-api"
REGION="us-east-1"
EMPTY_BUCKET=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --stack-name)
      STACK_NAME="$2"
      shift 2
      ;;
    --region)
      REGION="$2"
      shift 2
      ;;
    --empty-bucket)
      EMPTY_BUCKET=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Set AWS region
export AWS_DEFAULT_REGION=$REGION

echo "=== Cleaning up stack: $STACK_NAME ==="

# Get bucket name from stack outputs
BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='ProductsBucketName'].OutputValue" --output text 2>/dev/null)

# If the --empty-bucket flag is set and we found a bucket, empty it
if [ "$EMPTY_BUCKET" = true ] && [ -n "$BUCKET_NAME" ]; then
  echo "=== Emptying S3 bucket: $BUCKET_NAME ==="
  aws s3 rm s3://$BUCKET_NAME --recursive
  echo "Bucket emptied."
fi

# Delete the CloudFormation stack
echo "=== Deleting CloudFormation stack: $STACK_NAME ==="
aws cloudformation delete-stack --stack-name $STACK_NAME

echo "=== Stack deletion initiated. This may take a few minutes to complete. ==="
echo "=== You can check the status in the AWS CloudFormation console. ===" 