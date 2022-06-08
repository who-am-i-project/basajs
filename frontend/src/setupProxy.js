const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/socket', {
            target: 'http://localhost:8000', // API endpoint 1
            changeOrigin: true,
            ws: true,
            logLevel: 'debug'
        })
    );
    app.use(
        createProxyMiddleware('/scoreboard', {
            target: 'http://localhost:8001', // API endpoint 2
            changeOrigin: true,
            pathRewrite: {
                "^/scoreboard": "",
            },
            headers: {
                Connection: "keep-alive"
            }
        })
    );
}
