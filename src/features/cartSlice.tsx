import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

const loadCartFromLocalStorage = (): cartProducts[] => {
    const cart = localStorage.getItem('cart');
    if (cart === null) {
      return [];
    }else{
      return JSON.parse(cart);
    }
};

const loadTotalPriceFromLocalStorage = (): number => {
  const totalPrice = localStorage.getItem('totalPrice');
  if (totalPrice === null) {
    return 0;
  }else{
    return JSON.parse(totalPrice);
  }
};

interface cartProducts {
  _id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

interface cartProductState {
    value: cartProducts[];
    isPopupOpen: boolean;
    totalPrice: number;
}

const initialState: cartProductState = {
    value: loadCartFromLocalStorage(),   
    isPopupOpen: false,
    totalPrice: loadTotalPriceFromLocalStorage(),
}

const saveCartToLocalStorage = (cart: cartProducts[], totalPrice: number) => {
    const savedCart = JSON.stringify(cart);
    const savedTotalPrice = JSON.stringify(totalPrice);
    localStorage.setItem('cart', savedCart);
    localStorage.setItem('totalPrice', savedTotalPrice);
};

export const cartProductSlice = createSlice({
    name: 'cartProducts',
    initialState, 
    reducers:{
      changePopupVisibility: (state) => {
        state.isPopupOpen = !state.isPopupOpen;
      },
      addProduct: (state, action: PayloadAction<cartProducts>) => {
        const isBacket = state.value.find(item => item._id === action.payload._id);
        if(!isBacket){
          state.value = state.value.concat(action.payload);
        }else{
          const index = state.value.findIndex(product => product._id === action.payload._id);
          state.value[index].quantity = state.value[index].quantity + 1;
        }
        saveCartToLocalStorage(state.value, state.totalPrice);
      },
      deleteProduct: (state, action: PayloadAction<cartProducts>) => {
        state.value = state.value.filter( item => item._id !== action.payload._id);
        saveCartToLocalStorage(state.value, state.totalPrice);
      },
      clearCart: (state) => {
        state.value = [];
        saveCartToLocalStorage(state.value, state.totalPrice);
      },
      plusProduct: (state, action: PayloadAction<cartProducts>) => {
        const index = state.value.findIndex(product => product._id === action.payload._id);
        state.value[index].quantity = state.value[index].quantity + 1;
        saveCartToLocalStorage(state.value, state.totalPrice);
      },
      minusProduct: (state, action: PayloadAction<cartProducts>) => {
        const index = state.value.findIndex(product => product._id === action.payload._id);
        state.value[index].quantity = state.value[index].quantity - 1;
        saveCartToLocalStorage(state.value, state.totalPrice);
      },
      setTotalPrice: (state,  action: PayloadAction<string>) =>{
        switch (action.payload) {
          case 'EUR':
            state.totalPrice = +state.value.reduce((sum, product) => sum + product.price * 0.90 * product.quantity, 0).toFixed(2);
            saveCartToLocalStorage(state.value, state.totalPrice);
            break;
          case 'UAH':
            state.totalPrice = +state.value.reduce((sum, product) => sum + product.price * 41 * product.quantity, 0).toFixed(2);
            saveCartToLocalStorage(state.value, state.totalPrice);
            break;
          default:
            state.totalPrice = +state.value.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2);
            saveCartToLocalStorage(state.value, state.totalPrice);
        }
      }
    },
});

export const {changePopupVisibility, addProduct, deleteProduct, clearCart, plusProduct, minusProduct, setTotalPrice} = cartProductSlice.actions;

export const cartProducts = (state: RootState) => state.cartProducts.value;

export default cartProductSlice.reducer;