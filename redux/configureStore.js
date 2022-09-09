
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import countReducer from './reducers/countReducer';
import { getProductsReducer } from './reducers/countReducer';

const reducers = combineReducers(
    { 
        count: countReducer,
        products: getProductsReducer,
    }
);
const middleware = [thunk];
export const configureStore = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));




// const reducers = combineReducers(
//     { 
//         count: countReducer,
//         getProducts: getProductsReducer
//     }
// );
// // const configureStore = () => {
// //     return createStore(rootReducer);
// // }
// const middleware = [thunk];

// const configureStore = createStore(
//     reducers,
//     composeWithDevTools(applyMiddleware(...middleware))
//   );
  
// export default configureStore;
// // export const configureStore = createStore(rootReducer);