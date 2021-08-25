// noinspection NpmUsedModulesInstalled
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    //Proxy to local backend
    app.use(proxy('/api', {target: 'http://localhost:8080'}));
    //Proxy to production backend
    //app.use(proxy('/api', {target: 'https://www.markus-dope.de', secure: true, changeOrigin: true}));
};