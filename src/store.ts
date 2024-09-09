import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import cartReducer from './features/cartSlice';
import currencyReducer from './features/currencySlice';


export const store = configureStore({
  reducer: {
    products: productReducer,
    cartProducts: cartReducer,
    currency: currencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;