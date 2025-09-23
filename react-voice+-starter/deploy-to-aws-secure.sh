#!/bin/bash

# AWS S3 + CloudFront Deployment Script with Origin Access Control (OAC)
# This is the more secure approach - S3 bucket stays private, only CloudFront can access it

set -e  # Exit on any error

# Configuration
APP_NAME="voice-plus-starter"
TIMESTAMP=$(date +%s)
BUCKET_NAME="${APP_NAME}-hosting-${TIMESTAMP}"
AWS_REGION="us-east-1"
CLOUDFRONT_COMMENT="Voice+ App Distribution (OAC)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if AWS CLI is installed
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI is not installed. Please install it first."
        exit 1
    fi
    
    # Check if AWS credentials are configured
    if ! aws sts get-caller-identity &> /dev/null; then
        log_error "AWS credentials not configured. Run 'aws configure' first."
        exit 1
    fi
    
    # Get AWS account info
    AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text 2>/dev/null || echo "unknown")
    AWS_USER_ARN=$(aws sts get-caller-identity --query Arn --output text 2>/dev/null || echo "unknown")
    log_info "AWS Account: ${AWS_ACCOUNT_ID}"
    log_info "AWS User/Role: ${AWS_USER_ARN}"
    
    # Basic permission check
    log_info "Checking AWS permissions..."
    if ! aws s3 ls &> /dev/null; then
        log_error "No S3 access. Please ensure your AWS credentials have S3 permissions."
        exit 1
    fi
    
    # Check if npm is available
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install Node.js and npm first."
        exit 1
    fi
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        log_error "package.json not found. Please run this script from your React app root directory."
        exit 1
    fi
    
    log_success "All prerequisites met!"
}

# Build the React app
build_app() {
    log_info "Building React application..."
    
    if npm run build; then
        log_success "App built successfully!"
    else
        log_error "Build failed. Please fix build errors and try again."
        exit 1
    fi
    
    # Check if dist folder exists
    if [ ! -d "dist" ]; then
        log_error "dist folder not found after build. Check your build configuration."
        exit 1
    fi
}

# Create S3 bucket (private)
setup_s3_bucket() {
    log_info "Creating private S3 bucket: ${BUCKET_NAME}"
    
    # Create bucket
    if aws s3 mb "s3://${BUCKET_NAME}" --region "${AWS_REGION}"; then
        log_success "S3 bucket created successfully!"
    else
        log_error "Failed to create S3 bucket. The name might already be taken."
        exit 1
    fi
    
    # Keep bucket private - do NOT configure public access
    log_info "Bucket will remain private for security (CloudFront will access via OAC)"
}

# Upload files to S3
upload_to_s3() {
    log_info "Uploading files to S3..."
    
    # Sync all files
    aws s3 sync dist/ "s3://${BUCKET_NAME}" --delete
    
    log_success "Files uploaded successfully!"
}

# Create Origin Access Control
create_oac() {
    log_info "Creating Origin Access Control (OAC)..."
    
    OAC_OUTPUT=$(aws cloudfront create-origin-access-control \
        --origin-access-control-config "{
            \"Name\": \"${BUCKET_NAME}-oac\",
            \"Description\": \"OAC for ${BUCKET_NAME}\",
            \"SigningProtocol\": \"sigv4\",
            \"SigningBehavior\": \"always\",
            \"OriginAccessControlOriginType\": \"s3\"
        }")
    
    # Parse OAC ID
    if command -v jq &> /dev/null; then
        OAC_ID=$(echo "$OAC_OUTPUT" | jq -r '.OriginAccessControl.Id')
    else
        OAC_ID=$(echo "$OAC_OUTPUT" | grep -o '"Id": "[^"]*"' | cut -d'"' -f4)
    fi
    
    if [ -z "$OAC_ID" ]; then
        log_error "Failed to create Origin Access Control"
        exit 1
    fi
    
    log_success "Origin Access Control created: ${OAC_ID}"
}

# Create CloudFront distribution with OAC
setup_cloudfront() {
    log_info "Creating CloudFront distribution with OAC..."
    
    DISTRIBUTION_OUTPUT=$(aws cloudfront create-distribution \
        --distribution-config "{
            \"CallerReference\": \"${TIMESTAMP}\",
            \"Comment\": \"${CLOUDFRONT_COMMENT}\",
            \"DefaultRootObject\": \"index.html\",
            \"Origins\": {
                \"Quantity\": 1,
                \"Items\": [
                    {
                        \"Id\": \"${BUCKET_NAME}-origin\",
                        \"DomainName\": \"${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com\",
                        \"S3OriginConfig\": {
                            \"OriginAccessIdentity\": \"\"
                        },
                        \"OriginAccessControlId\": \"${OAC_ID}\"
                    }
                ]
            },
            \"DefaultCacheBehavior\": {
                \"TargetOriginId\": \"${BUCKET_NAME}-origin\",
                \"ViewerProtocolPolicy\": \"redirect-to-https\",
                \"MinTTL\": 0,
                \"DefaultTTL\": 86400,
                \"MaxTTL\": 31536000,
                \"ForwardedValues\": {
                    \"QueryString\": false,
                    \"Cookies\": {
                        \"Forward\": \"none\"
                    }
                },
                \"TrustedSigners\": {
                    \"Enabled\": false,
                    \"Quantity\": 0
                },
                \"AllowedMethods\": {
                    \"Quantity\": 2,
                    \"Items\": [\"GET\", \"HEAD\"],
                    \"CachedMethods\": {
                        \"Quantity\": 2,
                        \"Items\": [\"GET\", \"HEAD\"]
                    }
                }
            },
            \"CustomErrorResponses\": {
                \"Quantity\": 1,
                \"Items\": [
                    {
                        \"ErrorCode\": 404,
                        \"ResponsePagePath\": \"/index.html\",
                        \"ResponseCode\": \"200\",
                        \"ErrorCachingMinTTL\": 300
                    }
                ]
            },
            \"Enabled\": true,
            \"PriceClass\": \"PriceClass_100\"
        }")
    
    # Parse the output
    if command -v jq &> /dev/null; then
        DISTRIBUTION_ID=$(echo "$DISTRIBUTION_OUTPUT" | jq -r '.Distribution.Id')
        DISTRIBUTION_DOMAIN=$(echo "$DISTRIBUTION_OUTPUT" | jq -r '.Distribution.DomainName')
    else
        DISTRIBUTION_ID=$(echo "$DISTRIBUTION_OUTPUT" | grep -o '"Id": "[^"]*"' | head -1 | cut -d'"' -f4)
        DISTRIBUTION_DOMAIN=$(echo "$DISTRIBUTION_OUTPUT" | grep -o '"DomainName": "[^"]*"' | head -1 | cut -d'"' -f4)
    fi
    
    # Validate that we got the distribution info
    if [ -z "$DISTRIBUTION_ID" ] || [ -z "$DISTRIBUTION_DOMAIN" ]; then
        log_error "Failed to create CloudFront distribution or parse response."
        log_error "Output: $DISTRIBUTION_OUTPUT"
        exit 1
    fi
    
    log_success "CloudFront distribution created!"
    log_info "Distribution ID: ${DISTRIBUTION_ID}"
    log_info "Distribution Domain: ${DISTRIBUTION_DOMAIN}"
}

# Update S3 bucket policy to allow CloudFront OAC access
update_bucket_policy() {
    log_info "Updating S3 bucket policy to allow CloudFront access via OAC..."
    
    cat > /tmp/bucket-policy-oac.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${BUCKET_NAME}/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::${AWS_ACCOUNT_ID}:distribution/${DISTRIBUTION_ID}"
                }
            }
        }
    ]
}
EOF
    
    aws s3api put-bucket-policy \
        --bucket "${BUCKET_NAME}" \
        --policy file:///tmp/bucket-policy-oac.json
    
    # Clean up temp file
    rm /tmp/bucket-policy-oac.json
    
    log_success "S3 bucket policy updated for CloudFront access!"
}

# Create future deployment script
create_deploy_script() {
    log_info "Creating future deployment script..."
    
    cat > deploy-updates-secure.sh << EOF
#!/bin/bash

# Quick deployment script for future updates (OAC version)
# Run this script whenever you want to deploy changes

BUCKET_NAME="${BUCKET_NAME}"
DISTRIBUTION_ID="${DISTRIBUTION_ID}"

echo "Building app..."
npm run build

echo "Uploading to S3..."
aws s3 sync dist/ s3://\$BUCKET_NAME --delete

echo "Creating CloudFront invalidation..."
aws cloudfront create-invalidation --distribution-id \$DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"
echo "CloudFront URL: https://${DISTRIBUTION_DOMAIN}"
EOF
    
    chmod +x deploy-updates-secure.sh
    log_success "Created deploy-updates-secure.sh for future deployments"
}

# Save deployment info
save_deployment_info() {
    log_info "Saving deployment information..."
    
    cat > deployment-info-secure.txt << EOF
AWS Deployment Information (Secure OAC Setup)
=============================================
Deployment Date: $(date)
Bucket Name: ${BUCKET_NAME}
AWS Region: ${AWS_REGION}
Distribution ID: ${DISTRIBUTION_ID}
Distribution Domain: ${DISTRIBUTION_DOMAIN}
OAC ID: ${OAC_ID}

URLs:
- CloudFront (HTTPS): https://${DISTRIBUTION_DOMAIN}

Security Notes:
- S3 bucket is PRIVATE (not publicly accessible)
- Only CloudFront can access S3 content via Origin Access Control
- This is the recommended security best practice

AWS CLI Commands for Management:
- Delete bucket: aws s3 rb s3://${BUCKET_NAME} --force
- Delete distribution: aws cloudfront delete-distribution --id ${DISTRIBUTION_ID} --if-match \$(aws cloudfront get-distribution --id ${DISTRIBUTION_ID} --query 'ETag' --output text)
- List distributions: aws cloudfront list-distributions

Notes:
- CloudFront distribution takes 10-15 minutes to fully deploy
- Use deploy-updates-secure.sh for future deployments
- S3 costs are typically under \$1/month for small sites
- CloudFront costs are typically under \$1/month for small sites
EOF
    
    log_success "Deployment info saved to deployment-info-secure.txt"
}

# Cleanup function for error handling
cleanup_on_error() {
    log_warning "Cleaning up resources due to error..."
    
    if [ -n "$BUCKET_NAME" ]; then
        if aws s3api head-bucket --bucket "${BUCKET_NAME}" 2>/dev/null; then
            log_info "Removing S3 bucket: ${BUCKET_NAME}"
            aws s3 rb "s3://${BUCKET_NAME}" --force 2>/dev/null || true
        fi
    fi
    
    if [ -n "$DISTRIBUTION_ID" ]; then
        log_warning "CloudFront distribution ${DISTRIBUTION_ID} still exists."
        log_warning "You may want to disable and delete it manually if not needed."
    fi
    
    if [ -n "$OAC_ID" ]; then
        log_warning "Origin Access Control ${OAC_ID} still exists."
        log_warning "You may want to delete it manually: aws cloudfront delete-origin-access-control --id ${OAC_ID}"
    fi
}

# Trap to cleanup on script exit due to error
trap cleanup_on_error ERR

# Main deployment function
main() {
    log_info "Starting AWS deployment for React Voice+ App (Secure OAC Setup)..."
    log_info "Bucket will be created as: ${BUCKET_NAME}"
    
    # Confirm deployment
    echo ""
    log_warning "This will create AWS resources that may incur charges."
    log_warning "S3 and CloudFront costs are typically very low for static sites."
    log_info "This secure setup keeps your S3 bucket private and uses CloudFront OAC."
    echo ""
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Deployment cancelled."
        exit 0
    fi
    
    # Execute deployment steps
    check_prerequisites
    build_app
    setup_s3_bucket
    upload_to_s3
    create_oac
    setup_cloudfront
    update_bucket_policy
    create_deploy_script
    save_deployment_info
    
    echo ""
    log_success "🎉 Secure deployment completed successfully!"
    echo ""
    log_info "Your app is now available at:"
    log_info "🌐 CloudFront (HTTPS): https://${DISTRIBUTION_DOMAIN}"
    echo ""
    log_warning "Note: CloudFront distribution takes 10-15 minutes to fully deploy."
    log_info "Check deployment-info-secure.txt for all details."
    log_info "Use ./deploy-updates-secure.sh for future deployments."
    echo ""
    log_success "✅ Your S3 bucket is private and secure - only CloudFront can access it!"
}

# Run main function
main "$@"
