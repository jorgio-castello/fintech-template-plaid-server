import express = require('express');

module.exports = (app: express.Application) => {
    app.use('/api', require('./api'));
}