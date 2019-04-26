require('dotenv').load();
const path = require('path');
const app = require('connect')();
const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

const {PORT, MORGAN, STATIC, NODE_ENV} = process.env;
app.use(require('morgan')(MORGAN));
app.use(require('compression')());
app.use(require('serve-static')(path.join(__dirname, STATIC || '')));

if (NODE_ENV === 'development') {
    const config = require('./webpack.dev');
    const compiler = require('webpack')(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

require('http').createServer(app).listen(
    PORT,
    () => logger.info(`Server started at port ${PORT}`)
);
