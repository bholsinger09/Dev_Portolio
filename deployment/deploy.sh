#!/bin/bash

# AWS + DuckDNS Portfolio Deployment Script
# Usage: ./deploy.sh [domain] [ec2-ip] [key-file]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN=${1:-"your-domain.duckdns.org"}
EC2_IP=${2:-"your-ec2-ip"}
KEY_FILE=${3:-"~/.ssh/your-key.pem"}
REPO_URL="https://github.com/bholsinger09/Dev_Portolio.git"
APP_DIR="/home/ubuntu/Dev_Portolio"

echo -e "${BLUE}🚀 Starting AWS Portfolio Deployment${NC}"
echo -e "${YELLOW}Domain: $DOMAIN${NC}"
echo -e "${YELLOW}EC2 IP: $EC2_IP${NC}"

# Function to run commands on EC2
run_remote() {
    ssh -i "$KEY_FILE" ubuntu@"$EC2_IP" "$1"
}

# Function to copy files to EC2
copy_to_ec2() {
    scp -i "$KEY_FILE" "$1" ubuntu@"$EC2_IP":"$2"
}

echo -e "${BLUE}📦 Step 1: Updating application code${NC}"
run_remote "cd $APP_DIR && git pull origin main"

echo -e "${BLUE}🏗️ Step 2: Installing dependencies${NC}"
run_remote "cd $APP_DIR && npm ci --only=production"

echo -e "${BLUE}🔨 Step 3: Building application${NC}"
run_remote "cd $APP_DIR && npm run build"

echo -e "${BLUE}⚙️ Step 4: Updating PM2 configuration${NC}"
copy_to_ec2 "ecosystem.config.js" "$APP_DIR/"

echo -e "${BLUE}🔄 Step 5: Restarting application${NC}"
run_remote "cd $APP_DIR && pm2 reload ecosystem.config.js --env production"

echo -e "${BLUE}🌐 Step 6: Updating Nginx configuration${NC}"
# Replace placeholders in nginx.conf
sed "s/YOUR_DOMAIN/$DOMAIN/g" deployment/nginx.conf > /tmp/nginx.conf
copy_to_ec2 "/tmp/nginx.conf" "/etc/nginx/sites-available/portfolio"
run_remote "sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/"
run_remote "sudo nginx -t && sudo systemctl reload nginx"

echo -e "${BLUE}🔒 Step 7: Checking SSL certificate${NC}"
run_remote "sudo certbot certificates | grep $DOMAIN || echo 'SSL cert needs setup'"

echo -e "${BLUE}📊 Step 8: Checking application status${NC}"
run_remote "pm2 status"
run_remote "curl -f http://localhost:3000 > /dev/null && echo 'App is running' || echo 'App check failed'"

echo -e "${BLUE}🧪 Step 9: Running health checks${NC}"
sleep 10  # Wait for app to fully start

# Test HTTP redirect
if curl -s -I "http://$DOMAIN" | grep -q "301"; then
    echo -e "${GREEN}✅ HTTP to HTTPS redirect working${NC}"
else
    echo -e "${RED}❌ HTTP redirect check failed${NC}"
fi

# Test HTTPS
if curl -s -f "https://$DOMAIN" > /dev/null; then
    echo -e "${GREEN}✅ HTTPS access working${NC}"
else
    echo -e "${RED}❌ HTTPS access check failed${NC}"
fi

# Test API endpoint
if curl -s -f "https://$DOMAIN/api/health" > /dev/null; then
    echo -e "${GREEN}✅ API endpoints working${NC}"
else
    echo -e "${YELLOW}⚠️ API health check failed (may not be implemented)${NC}"
fi

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${BLUE}🌍 Your portfolio is now live at: https://$DOMAIN${NC}"

# Display useful commands
echo -e "\n${YELLOW}📋 Useful commands for monitoring:${NC}"
echo -e "SSH into server: ssh -i $KEY_FILE ubuntu@$EC2_IP"
echo -e "Check logs: pm2 logs portfolio"
echo -e "Restart app: pm2 restart portfolio"
echo -e "Check Nginx: sudo systemctl status nginx"
echo -e "Update DuckDNS: ~/duckdns/duck.sh"

# Optional: Run E2E tests against the new domain
read -p "🧪 Do you want to run E2E tests against the deployed site? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}🧪 Running E2E tests against https://$DOMAIN${NC}"
    BASE_URL="https://$DOMAIN" npx playwright test --project=chromium
fi

echo -e "${GREEN}🏆 Deployment process complete!${NC}"