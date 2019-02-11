var compression = require('compression');

const express = require('express');

var bodyParser = require('body-parser');

const _ = require("lodash");

const routes = require('./router');

module.exports = function () {

    const app = express();

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: true }));

    app.enable('trust proxy');

    app.use(compression());

    app.engine('html', require('ejs').renderFile);

    app.set('view engine', 'html');

    app.set('views', __dirname + '/public/template');

    app.use(express.static(__dirname + '/public'));

    app.use('/', routes);

    app.use(function (req, res, next) {
        res.status(404).json({
            meta: {
                success: false,
                msg: "Unhandled route"
            },
            data: null
        });
    });
    app.listen(process.env['port'] || 8992);
}

