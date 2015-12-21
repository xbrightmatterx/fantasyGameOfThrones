import { combineReducers } from 'redux';

let leagueReducer = (state = {}, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

let charactersReducer = (state = [], action) => {
  switch(action.type){
    default:
      return state;
  }
};

let eventsReducer = (state = [], action) => {
  switch(action.type) {
    default:
      return state;
  }
};

let userReducer = ( state = {}, action ) => {
  switch( action.type ){
    case 'UPDATE_USER_SUCCESS':
      console.log(action);
      return state;
    case 'UPDATE_USER_FAILURE':
      console.log(action);
      return state;
    case 'DELETE_USER':
      console.log(action);
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  characters: charactersReducer,
  league: leagueReducer,
  events: eventsReducer,
});