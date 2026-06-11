module.exports = {
  apps: [
    {
      name: 'api-folha-bet365',
      script: 'npm',
      args: 'start',
      autorestart: true,
      restart_delay: 5000,
    },
  ],
};
