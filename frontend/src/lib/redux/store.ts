import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/slices/cart/cartSlice'

configureStore({
    reducer: cartReducer
})