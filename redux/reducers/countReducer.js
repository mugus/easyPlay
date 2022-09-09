import { COUNT_INCRESE, COUNT_DECRESE, GET_PRODUCTS,GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL, LIKE_PRODUCT, UNLIKE_PRODUCT } from '../constants';

const initialState = {
    count: 0,
    like: 0,
    unlike: 0,
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

export const likeProductReducer = (state = initialState,action) => {
    switch (action.type) {
      case LIKE_PRODUCT:
        return {
            ...state,
            like: state.like + 1,
        };
      default:
        return state;
    }
};

export const unlikeProductReducer = (state = initialState,action) => {
    switch (action.type) {
      case UNLIKE_PRODUCT:
        return {
            ...state,
            unlike: state.unlike + 1,
        };  
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