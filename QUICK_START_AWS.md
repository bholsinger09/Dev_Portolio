# 🚀 Quick Start: AWS + DuckDNS Deployment

## 📋 Prerequisites Checklist
- [ ] AWS Account with EC2 access
- [ ] DuckDNS account (free registration at [duckdns.org](https://www.duckdns.org))
- [ ] SSH client (Terminal on Mac/Linux, PuTTY on Windows)
- [ ] Chosen domain name (e.g., `benholsinger.duckdns.org`)

## 🎯 Step-by-Step Deployment

### Step 1: Set up DuckDNS Domain (5 minutes)
1. Go to [duckdns.org](https://www.duckdns.org)
2. Sign in with Google, GitHub, or Reddit
3. Choose your subdomain (e.g., `benholsinger`)
4. **Copy your token** - you'll need this later
5. Note your full domain: `your-chosen-name.duckdns.org`

### Step 2: Launch AWS EC2 Instance (10 minutes)
1. **Login to AWS Console** → EC2 Dashboard
2. **Launch Instance**:
   - Name: `portfolio-server`
   - AMI: `Ubuntu Server 22.04 LTS`
   - Instance type: `t3.micro` (free tier)
   - Key pair: Create new or use existing
   - **Download `.pem` file** if creating new key
3. **Security Group** (IMPORTANT):
   ```
   SSH (22)     - Your IP address
   HTTP (80)    - 0.0.0.0/0 
   HTTPS (443)  - 0.0.0.0/0
   Custom (3000) - 0.0.0.0/0
   ```
4. **Storage**: 20 GB gp3
5. **Launch Instance**
6. **Note the Public IP** - you'll need this

### Step 3: Connect and Set Up Server (15 minutes)
```bash
# Make your key file secure (Mac/Linux)
chmod 400 your-key.pem

# Connect to your instance
ssh -i "your-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP

# Run the server setup script
curl -fsSL https://raw.githubusercontent.com/bholsinger09/Dev_Portolio/main/deployment/setup-server.sh | bash
```

### Step 4: Configure DuckDNS on Server (3 minutes)
```bash
# On your EC2 instance, run:
cd ~/Dev_Portolio/deployment
./setup-duckdns.sh YOUR_DOMAIN YOUR_TOKEN

# Example:
# ./setup-duckdns.sh benholsinger abc123-your-token-456def
```

### Step 5: Set Up SSL Certificate (5 minutes)
```bash
# Get SSL certificate from Let's Encrypt
sudo certbot --nginx -d YOUR_DOMAIN.duckdns.org

# Follow the prompts:
# - Enter email for notifications
# - Agree to terms
# - Choose redirect option (recommended)
```

### Step 6: Configure and Deploy (5 minutes)
```bash
# Copy and edit environment file
cd ~/Dev_Portolio
cp .env.production.example .env.production
nano .env.production  # Update YOUR_DOMAIN placeholders

# Update ecosystem config with your domain
nano ecosystem.config.js  # Replace YOUR_EC2_PUBLIC_IP with actual IP

# Update nginx config
sudo nano /etc/nginx/sites-available/portfolio
# Replace YOUR_DOMAIN with your actual domain

# Link nginx config
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Start the application
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup  # Follow the instructions it gives you
```

### Step 7: Verify Deployment (2 minutes)
```bash
# Check application status
pm2 status
pm2 logs portfolio

# Test your site
curl -I https://YOUR_DOMAIN.duckdns.org

# If everything works, you should see:
# HTTP/2 200 OK
```

## 🎉 Success! Your Portfolio is Live

Visit: `https://your-domain.duckdns.org`

## 🔄 Future Deployments

For updates, simply run:
```bash
# From your local machine
cd /path/to/your/portfolio
./deployment/deploy.sh your-domain.duckdns.org YOUR_EC2_IP ~/.ssh/your-key.pem
```

## 🛠️ Useful Commands

### On EC2 Server:
```bash
# Check application
pm2 status
pm2 logs portfolio
pm2 restart portfolio

# Check nginx
sudo systemctl status nginx
sudo nginx -t

# Update DuckDNS IP
~/duckdns/duck.sh

# Check SSL certificate
sudo certbot certificates
```

### Monitoring:
```bash
# System resources
htop
df -h
free -h

# Application logs
tail -f ~/logs/portfolio-combined.log
```

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Site not loading | Check security groups, nginx config |
| SSL errors | Run `sudo certbot renew`, check domain |
| App crashes | Check `pm2 logs`, restart with `pm2 restart portfolio` |
| Domain not resolving | Run `~/duckdns/duck.sh`, check DuckDNS token |

## 📊 Cost Estimate
- EC2 t3.micro: **Free** (first 12 months)
- DuckDNS: **Free** (always)
- SSL Certificate: **Free** (Let's Encrypt)
- **Total: $0/month** during free tier!

## 🔒 Security Features Included
- ✅ HTTPS with automatic SSL renewal
- ✅ Security headers (HSTS, XSS protection, etc.)
- ✅ Rate limiting on API endpoints
- ✅ Firewall configured with UFW
- ✅ Process management with PM2

Your portfolio is now production-ready with enterprise-grade security and performance! 🎯