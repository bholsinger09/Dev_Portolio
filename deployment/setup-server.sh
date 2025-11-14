#!/bin/bash

# AWS EC2 Server Setup Script
# Run this script on your EC2 instance after initial connection

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🛠️ Starting AWS EC2 Server Setup${NC}"

# Update system
echo -e "${BLUE}📦 Updating system packages${NC}"
sudo apt update && sudo apt upgrade -y

# Install essential packages
echo -e "${BLUE}🔧 Installing essential packages${NC}"
sudo apt install -y curl wget git htop unzip software-properties-common

# Install Node.js 20
echo -e "${BLUE}📦 Installing Node.js 20${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
echo -e "${BLUE}⚙️ Installing PM2${NC}"
sudo npm install -g pm2

# Install Docker
echo -e "${BLUE}🐳 Installing Docker${NC}"
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# Install Docker Compose
echo -e "${BLUE}🐳 Installing Docker Compose${NC}"
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Nginx
echo -e "${BLUE}🌐 Installing Nginx${NC}"
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Install Certbot
echo -e "${BLUE}🔒 Installing Certbot for SSL${NC}"
sudo apt install -y certbot python3-certbot-nginx

# Create directories
echo -e "${BLUE}📁 Creating necessary directories${NC}"
mkdir -p ~/logs
mkdir -p ~/duckdns
mkdir -p ~/.ssh

# Set up firewall
echo -e "${BLUE}🔥 Configuring UFW firewall${NC}"
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 3000
sudo ufw --force enable

# Clone repository
echo -e "${BLUE}📥 Cloning portfolio repository${NC}"
cd ~
git clone https://github.com/bholsinger09/Dev_Portolio.git
cd Dev_Portolio

# Install dependencies
echo -e "${BLUE}📦 Installing Node.js dependencies${NC}"
npm ci --only=production

# Build the application
echo -e "${BLUE}🏗️ Building the application${NC}"
npm run build

echo -e "${GREEN}✅ Server setup completed successfully!${NC}"

# Display next steps
echo -e "\n${YELLOW}📋 Next steps:${NC}"
echo -e "1. Set up DuckDNS domain and update IP"
echo -e "2. Configure environment variables in .env.production"
echo -e "3. Set up SSL certificate with: sudo certbot --nginx -d your-domain.duckdns.org"
echo -e "4. Start the application with: pm2 start ecosystem.config.js"
echo -e "5. Save PM2 configuration: pm2 save && pm2 startup"

# Display system information
echo -e "\n${BLUE}💻 System Information:${NC}"
echo -e "Node.js version: $(node --version)"
echo -e "NPM version: $(npm --version)"
echo -e "Docker version: $(docker --version)"
echo -e "PM2 version: $(pm2 --version)"
echo -e "Nginx version: $(nginx -v 2>&1)"

echo -e "\n${GREEN}🎉 Setup complete! Ready for deployment.${NC}"