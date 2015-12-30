var userControls = require('./userControls.js');

module.exports = function (app) {
  app.put('/:userid',  userControls.updateUser);
  app.delete('/:userid', userControls.deleteUser);
};



