
import callApi from "../Api/Api";



export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT';
export const GET_NUMBER_CART = 'GET_NUMBER_CART';
export const ADD_CART = 'ADD_CART';
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_CART = 'DELETE_CART';
export const UPDATE_CART_DATA = 'UPDATE_CART_DATA';


export const actFetchProductsRequest = () => {
  return (dispatch) => {
    return callApi('brick', 'get')
      .then((res) => {
        if (res && res.data) {
          dispatch(GetAllProduct(res.data));
        } else {
          // Handle the case when response data is missing or undefined
          throw new Error('Invalid response data');
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, display an error message, or take appropriate action
      });
  };
};

/* GET_ALL_PRODUCT */
export function GetAllProduct(payload) {
  return {
    type: GET_ALL_PRODUCT,
    payload
  };
}

/* GET NUMBER CART */
export function GetNumberCart() {
  return {
    type: GET_NUMBER_CART
  };
}


export function AddCart(payload){
  console.log(payload);
  return {
      type:'ADD_CART',
      payload
  }
 
}



export function UpdateCart(payload) {
  return {
    type: UPDATE_CART,
    payload
  };
}

export function DeleteCart(payload) {
  return {
    type: DELETE_CART,
    payload
  };
}

export function IncreaseQuantity(payload) {
  return {
    type: INCREASE_QUANTITY,
    payload
  };
}

export function DecreaseQuantity(payload) {
  return {
    type: DECREASE_QUANTITY,
    payload
  };
}

export const updateCartData = (cartData) => {
  return {
    type: UPDATE_CART_DATA,
    payload: cartData
  };
};

