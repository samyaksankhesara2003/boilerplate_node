module.exports = {
    apps: [
        {
            name: 'api',
            script: './apps/api/dist/index.mjs',
            instances: 'max',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production'
            },
            max_memory_restart: '1G',
            error_file: './logs/pm2-error.log',
            out_file: './logs/pm2-out.log',
            merge_logs: true,
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
        }
    ]
};
