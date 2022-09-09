import { COUNT_INCRESE, COUNT_DECRESE, GET_PRODUCTS,GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL } from '../constants';

const initialState = {
    count: 0,
    products: []
};

export const getProductsReducer = (state = initialState,action) => {
    switch (action.type) {
      case GET_PRODUCTS:
        return {
          products: [],
        };
      case GET_PRODUCTS_SUCCESS:
        return {
          products: action.payload,
        };
      case GET_PRODUCTS_FAIL:
        return { error: action.payload };
  
      default:
        return state;
    }
  };



const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'COUNT_INCRESE':
          return {
            ...state,
            count: state.count + 1,
          };
        case 'COUNT_DECRESE':
          return {
            ...state,
            count: state.count - 1,
          };
        default:
          return state;
      }
}
export default countReducer;