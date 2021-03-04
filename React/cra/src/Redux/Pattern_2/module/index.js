import { combineReducers } from 'redux';
import todo from './todo';
import person from './person';
import filter from './filter'

export default combineReducers({todo, person, filter});