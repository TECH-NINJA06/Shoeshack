import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CartItem {
  product: string;
  size: number;
  quantity: number;
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
            const {product, size} = action.payload;
            const newItem: CartItem = {
              product: product,
              size: size,
              quantity: 1
          };
            axios.post("/api/cart", {productId: product, productSize: size});
            state.cartItems.push(newItem);
        },
        removeCart: (state, action) => {
          const { productId, size } = action.payload;
      
          // Find the index of the item to be removed
          const itemIndex = state.cartItems.findIndex(
              (item) => item.product === productId && item.size === size
          );
      
          // Remove the item from the cartItems array
          state.cartItems.splice(itemIndex, 1);
      
          // Make the API call to delete the item from the server-side cart
          axios.delete("/api/cart", { data: { productId: productId, productSize: size } });
          console.log("ProductID: " + productId, "ProductSize: " + size);
        },             
        updateCart: (state, action) => {
            const { product, size, cartFunction } = action.payload;
            const itemIndex = state.cartItems.findIndex(
                (item) => item.product === product && item.size === size
              );
            if (cartFunction === 'add') {
              state.cartItems[itemIndex].quantity += 1;
              axios.post("/api/cart", {productId: product, productSize: size}); 

            } else if (cartFunction === 'subtract') {
              axios.patch("/api/cart", {
                  productId: product,
                  productSize: size,
                  cartFunction: 'subtract'
              });    
              state.cartItems[itemIndex].quantity -= 1;      
            }
        },
        // deleteCart: (state, action) => {

        // },
        dbCartUpdate: (state, action) => {
          state.cartItems = action.payload;
        }        
    }
})

export const { addCart, removeCart, updateCart, dbCartUpdate } = cartSlice.actions

export default cartSlice.reducer