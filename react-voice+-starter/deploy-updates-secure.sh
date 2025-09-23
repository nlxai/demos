#!/bin/bash

# Quick deployment script for future updates (OAC version)
# Run this script whenever you want to deploy changes

BUCKET_NAME="voice-plus-starter-hosting-1758217224"
DISTRIBUTION_ID="ES6T33FIKW937"

echo "Building app..."
npm run build

echo "Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete

echo "Creating CloudFront invalidation..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"
echo "CloudFront URL: https://d1b3aj4p8jmb8z.cloudfront.net"
