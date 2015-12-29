var mysql = require('mysql');
var expect = require('chai').expect;
var authControls = require('./authDB');
var userControls = require('./userDB');
var leagueControls = require('./leagueDB');
var eventControls = require('./eventDB');
var characterControls = require('./characterDB');

/********************************************************
* Run this file first from root dir to drop/recreate DB 
* and tables: 'mysql -u root < server/db/schema.sql'
* Then Run: 'mocha server/db/tests/js'
*********************************************************/

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'got'
});

var users = [
  {
    username: 'user1',
    password: 'password'
  },
  {
    username: 'user2',
    password: 'password'
  },
  {
    username: 'user3',
    password: 'password'
  }
];

describe('Auth Controller', function () {

  it('Should insert a new user into the DB', function (done) {
    
    authControls.addNewUser(users[0])
      .then(function (results) {
        
        authControls.findUser({username: users[0].username})
          .then(function (user) {
            expect(user[0].username).to.equal('user1');
            done();
          });
      })
      .catch(function (err) {
        console.error('error in new user test: ', err);
        done(err);
      });
  });

});

describe('League Controller', function () {
  var id, id2; // stored via insert new league,
          // used in update league name test
  it('Should insert a new league into the DB', function (done) {

    leagueControls.addLeague({name: 'targaryan', user_id: 1})
      .then(function (leagueCreated) {

        leagueControls.findLeague({name: 'targaryan'})
          .then(function (league) {
            id = league[0].league_id;
            expect(league[0].name).to.equal('targaryan');
            done();
          });
      })
      .catch(function (err) {
        console.error('error in new league test: ', err);
        done(err);
      });
  });

  it('Should update league with a different user_id (different moderator)', function (done) {
    // add new user, then update existing league with new user_id
    authControls.addNewUser(users[1])
      .then(function (results) {
        id2 = results.insertId;
        leagueControls.updateLeague({user_id: id2}, 'targaryan')
          .then(function (results) {
            leagueControls.findLeague({name: 'targaryan'})
              .then(function (league) {
                //verify user_id was updated
                expect(league[0].user_id).to.equal(id2);
                done();
              });
          });
      })
      .catch(function (err) {
        console.error('something wrong updating league with user_id test: ', err);
      });
  });

  it('Should update league name', function (done) {
    leagueControls.updateLeague({name: 'johnsnow'}, 'targaryan')
      .then(function (results) {
        leagueControls.findLeague({name: 'johnsnow'})
          .then(function (league) {
            // check for same id as original league stored
            expect(league[0].league_id).to.equal(id);
            done();
          });
      })
      .catch(function (err) {
        console.error('something wrong updating league name: ', err);
        done(err);
      });
  });

});

describe('User Controller', function () {

  it('Should update users league', function (done) {
    // find userID, store it
    // find league
    //check if mod exists
      // if yes, store it in a var oldMod
      //update league with new userID
      // update user with isMod true
      // update oldMod with isMod false
    // verify oldMod is no longer the mod
    // verify user isMod (is there a way to check as you update?)
  });

  it('Should delete a user ', function (done) {
    // add user
    authControls.addNewUser(users[2])
      .then(function (results) {
        //delete user
        authControls.findUser({username: users[2].username})
          .then(function (user) {
            expect(user.length).to.equal(1);
          });
          userControls.deleteUser(users[2])
            .then(function (user) {
              authControls.findUser({username: users[2].username})
                .then(function (users) {
                  // if no items in array of results, user was deleted
                  expect(users.length).to.equal(0);
                  done();
                });
            });
      })
      .catch(function (err) {
        console.error('error in delete user test: ', err);
        done(err);
      });
  });

});

var characters = [
  {
    name: 'gary',
    house: 'afraternity',
    image: 'http://www.gameofthrones.com'
  }
];

var events = [
  {
    type: 'death',
    description: 'gary gets his head chopped off',
    episode: 4,
    season: 6,
    char_id: 1,
    points: 100
  }
];

xdescribe('Characters Controller', function () {
  it('Should insert a new character into the DB', function (done) {

  });

});

xdescribe('Events Controller', function () {
  it('Should insert a new event into the DB', function (done) {
    eventControls.addEvent(events[0])
      .then(function (results) {
        done();
      })
      .catch(function (err) {
        console.error('error in inserting event test: ', err);
        done();
      });
  });

});

