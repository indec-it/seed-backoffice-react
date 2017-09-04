const path = require('path');
const app = require('connect')();
const config = require('./config.json');
const winston = require('winston');
const fs = require("fs");

process.env.NODE_ENV = config.mode;
app.use(require('morgan')(config.server.morgan));
app.use(require('compression')());
app.use(require('serve-static')(path.join(__dirname, config.server.static)));

if (config.mode === 'development') {
    const config = require('./webpack.config');
    const compiler = require('webpack')(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

require('http').createServer(app).listen(
    config.server.port,
    () => winston.info('Server started at port %s', config.server.port)
);
