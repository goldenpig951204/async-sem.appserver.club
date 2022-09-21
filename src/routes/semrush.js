const express = require('express');
const { memberMiddleware } = require('../middlewares/permission');
const {
    domainOverviewMiddleware,
    keywordOverviewMiddleware,
    semrushProxy 
} = require('../middlewares/semrushMiddleware');
const semrushRouter = express.Router();
const config = require('../services/config');
/** Set admin-related routes. */
const applyMiddleware = (req, res, next) => {
    let locale = config.getConfig()["locale"] ? config.getConfig()["locale"]: "www";
    return semrushProxy(locale)(req, res, next);
}

semrushRouter.use(
    '/', 
    memberMiddleware, 
    (req, res, next) => {
        let contentType = req.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
            req.headers["content-type"] = "application/json; charset=UTF-8";
        }
        next();
    }, 
    express.json(), 
    (req, res, next) => {
        next();
    }, 
    domainOverviewMiddleware, 
    keywordOverviewMiddleware, 
    applyMiddleware
);

module.exports = semrushRouter;
