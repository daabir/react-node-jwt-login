import loginreducer from './loginreducer';
import datareducer from './datareducer';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    loginreducer,
    datareducer
});

export default rootReducers;