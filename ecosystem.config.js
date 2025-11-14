module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: 'npm',
      args: 'start',
      cwd: '/home/ubuntu/Dev_Portolio',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: 1
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: 1
      },
      error_file: '/home/ubuntu/logs/portfolio-error.log',
      out_file: '/home/ubuntu/logs/portfolio-out.log',
      log_file: '/home/ubuntu/logs/portfolio-combined.log',
      time: true
    }
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: 'YOUR_EC2_PUBLIC_IP',
      key: '~/.ssh/your-key.pem',
      ref: 'origin/main',
      repo: 'https://github.com/bholsinger09/Dev_Portolio.git',
      path: '/home/ubuntu/Dev_Portolio',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};