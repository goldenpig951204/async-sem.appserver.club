const app = require('./app');
const port = process.env.PORT || 4000;
const connect = require('./models');
const Setting = require('./models/setting');
const config = require('./services/config');
/** Start User Node Server */
const start = () => {
  /** Connect Database */
  connect().then(() => {
    /** Getting Setting From Database */
    Setting.findOne().then(setting => {
      config.setConfig(setting);
      app.listen(port, () => console.log(`Server listening ===> : https://${process.env.DOMAIN}`));
    });
  }, err => console.log('Error ===> : ', err.toString()));
};

start();
