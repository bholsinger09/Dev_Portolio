# 🚀 AWS + DuckDNS Portfolio Deployment Guide

## Overview
This guide will help you deploy your Next.js portfolio to AWS EC2 with a custom DuckDNS domain and SSL certificates.

## 📋 Prerequisites
- AWS Account with appropriate permissions
- DuckDNS account (free)
- SSH key pair for EC2 access
- Domain name preference (e.g., benholsinger.duckdns.org)

## 🏗️ Phase 1: AWS Infrastructure Setup

### 1. Create EC2 Instance
```bash
# Launch a new EC2 instance
Instance Type: t3.micro (Free tier eligible)
AMI: Ubuntu Server 22.04 LTS
Storage: 20 GB gp3
Security Group: Create new with ports 22, 80, 443, 3000
Key Pair: Create new or use existing
```

### 2. Security Group Configuration
```bash
# Inbound Rules
SSH (22)     - Your IP
HTTP (80)    - 0.0.0.0/0
HTTPS (443)  - 0.0.0.0/0
Custom (3000) - 0.0.0.0/0 (for development)
```

### 3. Connect to Instance
```bash
# Connect via SSH
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip

# Update system
sudo apt update && sudo apt upgrade -y
```

## 🌐 Phase 2: DuckDNS Configuration

### 1. Set up DuckDNS Account
1. Go to [DuckDNS.org](https://www.duckdns.org)
2. Sign in with your preferred method
3. Choose your subdomain (e.g., `benholsinger`)
4. Note your token for later use

### 2. Configure Dynamic DNS
```bash
# Create DuckDNS update script on EC2
mkdir ~/duckdns
cd ~/duckdns
nano duck.sh

# Add to duck.sh:
#!/bin/bash
echo url="https://www.duckdns.org/update?domains=YOUR_DOMAIN&token=YOUR_TOKEN&ip=" | curl -k -o ~/duckdns/duck.log -K -

# Make executable and test
chmod 700 duck.sh
./duck.sh

# Add to crontab for automatic updates
crontab -e
# Add: */5 * * * * ~/duckdns/duck.sh >/dev/null 2>&1
```

## 🐳 Phase 3: Docker & Application Setup

### 1. Install Docker
```bash
# Install Docker
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Install Node.js & PM2
```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Verify installations
node --version
npm --version
pm2 --version
```

## 🔒 Phase 4: SSL Certificate Setup

### 1. Install Certbot
```bash
# Install Certbot for Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Install and Configure Nginx
```bash
# Install Nginx
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

## 📦 Phase 5: Application Deployment

### 1. Clone Repository
```bash
# Clone your portfolio repository
cd /home/ubuntu
git clone https://github.com/bholsinger09/Dev_Portolio.git
cd Dev_Portolio

# Install dependencies
npm install

# Build the application
npm run build
```

### 2. PM2 Configuration
```bash
# Create PM2 ecosystem file
# (See ecosystem.config.js in deployment files)

# Start application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🌍 Phase 6: Domain & SSL Configuration

### 1. Configure Nginx for your domain
```bash
# Create Nginx configuration
# (See nginx.conf in deployment files)

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 2. Obtain SSL Certificate
```bash
# Get Let's Encrypt certificate
sudo certbot --nginx -d your-domain.duckdns.org

# Verify auto-renewal
sudo certbot renew --dry-run
```

## 🚀 Phase 7: Final Deployment

### 1. Environment Variables
```bash
# Create .env.production
# (See .env.production.example)
```

### 2. Deploy Script
```bash
# Use deploy.sh for automated deployments
# (See deploy.sh in deployment files)
```

## 📊 Monitoring & Maintenance

### Daily Tasks
- Check PM2 status: `pm2 status`
- View logs: `pm2 logs`
- Monitor system: `htop` or `free -h`

### Weekly Tasks
- Update system: `sudo apt update && sudo apt upgrade`
- Check SSL certificate: `sudo certbot certificates`
- Restart services if needed: `pm2 restart all`

## 🔧 Troubleshooting

### Common Issues
1. **Port 3000 not accessible**: Check security groups
2. **Domain not resolving**: Verify DuckDNS configuration
3. **SSL issues**: Check Certbot logs and Nginx config
4. **Application crashes**: Check PM2 logs and restart

### Useful Commands
```bash
# Check application logs
pm2 logs portfolio

# Restart application
pm2 restart portfolio

# Check Nginx status
sudo systemctl status nginx

# Update DuckDNS IP
~/duckdns/duck.sh
```

## 📋 Next Steps
After completing this setup, your portfolio will be accessible at:
- **HTTP**: http://your-domain.duckdns.org
- **HTTPS**: https://your-domain.duckdns.org (with SSL)

The deployment will be production-ready with automatic SSL renewal and process management.