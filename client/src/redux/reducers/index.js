import loginreducer from './loginreducer';
import datareducer from './datareducer';
import loginstatereducer from './loginstatereducer';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    loginreducer,
    datareducer,
    loginstatereducer
});

export default rootReducers;