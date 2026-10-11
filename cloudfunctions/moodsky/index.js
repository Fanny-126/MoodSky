const { createRouter } = require('./router');
let cloud;
exports.main = async (event) => {
  if (!cloud) {
    cloud = require('wx-server-sdk');
    cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
  }
  // Never get identity from event/payload. Do not log this context.
  return createRouter()(event, cloud.getWXContext());
};
