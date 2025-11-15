#!/usr/bin/env node

const { exec } = require('child_process');
const http = require('http');
const crypto = require('crypto');

// Simple deployment webhook server
// This runs on the AWS instance to handle deploy requests

const PORT = 3001; // Different port from main app

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/deploy') {
    console.log('🚀 Deployment request received');
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    // Execute deployment commands
    const commands = [
      'cd /home/ubuntu/Dev_Portolio',
      'git fetch origin main',
      'git reset --hard origin/main',
      'npm ci --only=production',
      'npm run build',
      'pm2 reload ecosystem.config.js --env production'
    ].join(' && ');

    exec(commands, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Deployment failed:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: false,
          error: error.message,
          stderr: stderr
        }));
        return;
      }

      console.log('✅ Deployment successful');
      console.log('STDOUT:', stdout);
      if (stderr) console.log('STDERR:', stderr);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Deployment completed successfully',
        output: stdout
      }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`🔧 Deployment webhook server running on port ${PORT}`);
});