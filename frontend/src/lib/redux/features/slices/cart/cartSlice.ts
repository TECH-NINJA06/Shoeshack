import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CartItem {
  id: string;
  title: string;
  itemImg: string;
  size: number;
  brand: string;
  quantity: number;
  price: number;
}


const initialState = {
  cartItems: [] as CartItem[],
}


export const cartSlice = createSlice({
    name: 'cartItem',
    initialState: initialState,
    reducers: {
      //action.payload is sent from frontend while state is the value present in the store
        addCart: (state, action) => {
            const item: CartItem = {
                id: action.payload.id,
                title: action.payload.title,
                itemImg: action.payload.itemImg,
                size: action.payload.size,
                brand: action.payload.brand,
                price: action.payload.price,
                quantity: 1
            }
            state.cartItems.push(item);
            // axios.post("/api/cart", {productId: item.id, productSize: item.size});
        },
        removeCart: (state, action) => {
          const item: CartItem = {
            id: action.payload.id,
            title: action.payload.title,
            itemImg: action.payload.itemImg,
            size: action.payload.size,
            brand: action.payload.brand,
            price: action.payload.price,
            quantity: 1
        }
          const itemIndex = state.cartItems.findIndex(
            (item) => item.id === action.payload.id && item.size === action.payload.size
          );
          state.cartItems.splice(itemIndex, 1);
          // axios.delete("/api/cart", {productId: item.id, productSize: item.size});
        },
        updateCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id && item.size === action.payload.size
              );
            if (action.payload.function === 'add') {
              state.cartItems[itemIndex].quantity += 1;
            } else if (action.payload.function === 'subtract') {
              state.cartItems[itemIndex].quantity -= 1
            }
        }
    }
})

export const { addCart, removeCart, updateCart } = cartSlice.actions

export default cartSlice.reducer