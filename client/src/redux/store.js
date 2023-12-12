import { legacy_createStore as createStore } from 'redux';
import rootReducers from '../redux/reducers/index';

function saveToStorage(state){
    try{
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serialisedState);
    } catch(e){
        console.warn(e);
    }
}

function loadFromStorage(){
    try{
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState == null) return undefined;
        return JSON.parse(serialisedState)
    } catch(e){
        console.warn(e);
        return undefined;
    }
}

const store = createStore(
    rootReducers,
    loadFromStorage()
);

store.subscribe(() => saveToStorage(store.getState()));

export default store;