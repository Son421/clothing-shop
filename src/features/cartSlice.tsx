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
    totalPrice: 0,
}

const saveCartToLocalStorage = (cart: cartProducts[]) => {
    const savedCart = JSON.stringify(cart);
    localStorage.setItem('cart', savedCart);
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
        saveCartToLocalStorage(state.value);
      },
      deleteProduct: (state, action: PayloadAction<cartProducts>) => {
        state.value = state.value.filter( item => item._id !== action.payload._id);
        saveCartToLocalStorage(state.value);
      },
      plusProduct: (state, action: PayloadAction<cartProducts>) => {
        const index = state.value.findIndex(product => product._id === action.payload._id);
        state.value[index].quantity = state.value[index].quantity + 1;
        saveCartToLocalStorage(state.value);
      },
      minusProduct: (state, action: PayloadAction<cartProducts>) => {
        const index = state.value.findIndex(product => product._id === action.payload._id);
        state.value[index].quantity = state.value[index].quantity - 1;
        saveCartToLocalStorage(state.value);
      },
      setTotalPrice: (state,  action: PayloadAction<string>) =>{
        switch (action.payload) {
          case 'EUR':
            state.totalPrice = +state.value.reduce((sum, product) => sum + product.price * 0.90 * product.quantity, 0).toFixed(2);
            break;
          case 'UAH':
            state.totalPrice = +state.value.reduce((sum, product) => sum + product.price * 41 * product.quantity, 0).toFixed(2);
            break;
          default:
            state.totalPrice = +state.value.reduce((sum, product) => sum + product.price * product.quantity, 0).toFixed(2);
        }
      }
    },
});

export const {changePopupVisibility, addProduct, deleteProduct, plusProduct, minusProduct, setTotalPrice} = cartProductSlice.actions;

export const cartProducts = (state: RootState) => state.cartProducts.value;

export default cartProductSlice.reducer;