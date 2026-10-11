const api = require('../../services/api');
module.exports = {
  createSaveRequest: (input) => api.createRequest('journal.upsert', input),
  get: (date) => api.call(api.createRequest('journal.get', { date })),
  remove: (input) => api.call(api.createRequest('journal.delete', input)),
  submit: (request) => api.call(request),
};
