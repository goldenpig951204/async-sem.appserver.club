const express = require('express');
const { authMiddleware } = require('../middlewares/permission');
const authorizeRouter = express.Router();
const Setting = require('../models/setting');
const config = require('../services/config');
/** * Set routes that determines to send the requests that comes from the wordpress site to admin, semrush/project or 404 page. */
authorizeRouter.use('/', authMiddleware, (req, res) => {
    Setting.findOne().then(setting => {
        config.setConfig(setting);
        return res.status(301).redirect('/projects');
    });
});

module.exports = authorizeRouter;