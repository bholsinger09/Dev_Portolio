#!/bin/bash

# DuckDNS Configuration Script
# Usage: ./setup-duckdns.sh [domain] [token]

set -e

DOMAIN=${1:-"your-domain"}
TOKEN=${2:-"your-token"}

echo "🦆 Setting up DuckDNS for domain: $DOMAIN.duckdns.org"

# Create duckdns directory
mkdir -p ~/duckdns
cd ~/duckdns

# Create update script
cat > duck.sh << EOF
#!/bin/bash
echo url="https://www.duckdns.org/update?domains=$DOMAIN&token=$TOKEN&ip=" | curl -k -o ~/duckdns/duck.log -K -
EOF

# Make script executable
chmod 700 duck.sh

# Test the script
echo "🧪 Testing DuckDNS update..."
./duck.sh

# Check result
if grep -q "OK" duck.log; then
    echo "✅ DuckDNS update successful!"
else
    echo "❌ DuckDNS update failed. Check your domain and token."
    exit 1
fi

# Add to crontab
echo "⏰ Setting up automatic updates every 5 minutes..."
(crontab -l 2>/dev/null; echo "*/5 * * * * ~/duckdns/duck.sh >/dev/null 2>&1") | crontab -

# Create status check script
cat > check-status.sh << EOF
#!/bin/bash
echo "DuckDNS Status Check for $DOMAIN.duckdns.org"
echo "Current IP: \$(curl -s ifconfig.me)"
echo "Last update: \$(cat ~/duckdns/duck.log)"
nslookup $DOMAIN.duckdns.org
EOF

chmod +x check-status.sh

echo "🎉 DuckDNS setup complete!"
echo "📋 Useful commands:"
echo "  Update IP: ~/duckdns/duck.sh"
echo "  Check status: ~/duckdns/check-status.sh"
echo "  View log: cat ~/duckdns/duck.log"

# Show current status
echo "🔍 Current status:"
./check-status.sh