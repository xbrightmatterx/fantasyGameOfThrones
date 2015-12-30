var leagueControls = require('./leagueControls');

module.exports = function (app) {
  app.post('/:name', leagueControls.addLeague);
  app.put('/:name', leagueControls.updateLeague);
  app.get('/:name', leagueControls.getLeagueInfo);
};