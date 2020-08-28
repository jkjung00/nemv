module.exports = {
  apps : [{
    name: 'nemv',
    script: './be/bin/www',
    max_memory_restart: '1G',
    env: {
      NODE_ENV: "development",
      port: 3000
    },
    env_pro: {
      NODE_ENV: "production",
      port: 80
    }
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
