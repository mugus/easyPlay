import { COUNT_INCRESE, COUNT_DECRESE, GET_PRODUCTS,GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL } from '../constants';
import axios from 'axios';

export const GetProducts = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCTS });
    
        const { data } = await axios.get(`http://197.243.14.102:4000/api/v1/products`);
        
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_PRODUCTS_FAIL, payload: error });
    }
}


export const increment = () => {
    return {
      type: 'COUNT_INCRESE',
    };
  };
   
  export const decrement = () => {
    return {
      type: 'COUNT_DECRESE',
    };
  };