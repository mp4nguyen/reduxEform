import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

import eformReducer from './eformReducer';



const rootReducer = combineReducers({
  toastr: toastrReducer,
  eform: eformReducer  
});

export default rootReducer;
