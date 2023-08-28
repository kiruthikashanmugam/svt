



import { combineReducers } from 'redux';
import { GET_ALL_PRODUCT, GET_NUMBER_CART, ADD_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, DELETE_CART } from "../Actions/cartActions";

const initProduct = {
  numberCart: 0,
  Carts: [],
  _products: [],
};
const updateLocalStorage = (cartItems, numberCart) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('numberCart', numberCart.toString());
};
// Retrieve data from local storage
const cartId = localStorage.getItem('cartId');
 const cartItems = JSON.parse(localStorage.getItem('cartItems'));
const numberCart = parseInt(localStorage.getItem('numberCart'));

// Update the initial state with the retrieved values
if (cartId) {
  initProduct.cartId = cartId;
}
if (cartItems) {
  initProduct.Carts = cartItems;
}
if (!isNaN(numberCart)) {
  initProduct.numberCart = numberCart;
}


function todoProduct(state = initProduct, action) {
  switch (action.type) {
    case GET_ALL_PRODUCT:
      return {
        ...state,
        _products: action.payload
      }
    case GET_NUMBER_CART:
      return {
        ...state
      }
      case ADD_CART:
  let check = false;
  state.Carts.forEach((item, key) => {
    if (item._id === action.payload._id && item.service_fees === action.payload.service_fees) {
      check = true;
      state.Carts[key].quantity += 1; // Increase the quantity of the existing item
    }
  });
  if (!check) {
    let _cart = {
      ...action.payload,
      quantity: 1,
    };
    state.Carts.push(_cart); // Add a new item to the cart
  }
  localStorage.setItem('cartItems', JSON.stringify(state.Carts));
  localStorage.setItem('numberCart', state.numberCart + 1);
  return {
    ...state,
    numberCart: state.numberCart + 1,
  };

      

    case INCREASE_QUANTITY:
      state.numberCart++
      state.Carts[action.payload].quantity++;
      localStorage.setItem('cartItems', JSON.stringify(state.Carts));
      localStorage.setItem('numberCart', state.numberCart);
      return {
        ...state
      }
    case DECREASE_QUANTITY:
      let quantity = state.Carts[action.payload].quantity;
      if (quantity > 1) {
        state.numberCart--;
        state.Carts[action.payload].quantity--;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.Carts));
      localStorage.setItem('numberCart', state.numberCart - 1);
      return {
        ...state
      }
      case DELETE_CART:
        const deletedItem = state.Carts[action.payload];
        const updatedCartsDelete = state.Carts.filter((item, index) => index !== action.payload);
        const updatedNumberCartDelete = state.numberCart - deletedItem.quantity;
        updateLocalStorage(updatedCartsDelete, updatedNumberCartDelete);
        return {
          ...state,
          numberCart: updatedNumberCartDelete,
          Carts: updatedCartsDelete
        };
  
      default:
        return state;
    }
  
}
const ShopApp = combineReducers({
  _todoProduct: todoProduct
});
export default ShopApp;

