import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cartReducer from '../Reducers/cartReducer';

const store = createStore(cartReducer, applyMiddleware(thunk));

export default store;

    
    
    