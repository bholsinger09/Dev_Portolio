#!/usr/bin/env node

import https from 'https';

const deployUrl = 'https://portfolio-ben.duckdns.org:3001/deploy';

console.log('🚀 Triggering AWS deployment...');

const postData = JSON.stringify({
  trigger: 'deploy',
  timestamp: new Date().toISOString()
});

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(deployUrl, options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('📦 Deployment Response:');
    try {
      const result = JSON.parse(data);
      if (result.success) {
        console.log('✅ Deployment successful!');
        console.log('🌐 Portfolio updated at https://portfolio-ben.duckdns.org');
      } else {
        console.log('❌ Deployment failed:', result.error);
      }
    } catch (e) {
      console.log('Response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Deployment request failed:', error.message);
  console.log('💡 The deployment webhook may not be running on the AWS instance.');
  console.log('💡 Manual deployment may be required via SSH or AWS console.');
});

req.write(postData);
req.end();