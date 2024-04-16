import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/slices/cart/cartSlice'

export const store = configureStore({
    reducer: cartReducer
})