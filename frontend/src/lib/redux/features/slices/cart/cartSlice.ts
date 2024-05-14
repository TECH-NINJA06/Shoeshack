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
            axios.post("/api/cart", {productId: item.id, productSize: item.size});
        },
        removeCart: (state, action) => {
          const { id, size } = action.payload;
        
          // Find the index of the item to be removed
          const itemIndex = state.cartItems.findIndex(
            (item) => item.id === id && item.size === size
          );
        
          // Remove the item from the cartItems array
          state.cartItems.splice(itemIndex, 1);
        
          // Make the API call to delete the item from the server-side cart
          axios.delete("/api/cart", { data: { productId: id, productSize: size } })
        },        
        updateCart: (state, action) => {
            const { id, size } = action.payload;
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === id && item.size === size
              );
            if (action.payload.function === 'add') {
              state.cartItems[itemIndex].quantity += 1;
              axios.post("/api/cart", {productId: id, productSize: size}); 
            } else if (action.payload.function === 'subtract') {
              state.cartItems[itemIndex].quantity -= 1;
              axios.delete("/api/cart", { data: { productId: id, productSize: size } })
            
            }
        },
        // dbCartUpdate: (state, action) => {
        //   const { cartItems } = action.payload;
        //   state.cartItems.push(cartItems)
        // }
    }
})

export const { addCart, removeCart, updateCart } = cartSlice.actions

export default cartSlice.reducer