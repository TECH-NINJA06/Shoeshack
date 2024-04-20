import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [
    ],
}



export const cartSlice = createSlice({
    name: 'cartItem',
    initialState: initialState,
    reducers: {
        addCart: (state, action) => {
            const item = {
                id: action.payload.id,
                title: action.payload.title,
                itemImg: action.payload.itemImg,
                size: action.payload.size,
                brand: action.payload.brand,
                quantity: 1
            }
            state.cartItems.push(item);
        },
        removeCart: (state, action) => {
          const itemIndex = state.cartItems.findIndex(
            (item) => item.id === action.payload.id && item.size === action.payload.size
          );
          state.cartItems.splice(itemIndex, 1);
        },
        updateCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id && item.size === action.payload.size
              );
            if (action.payload.function === 'add') {
              state.cartItems[itemIndex].quantity += 1
            } else if (action.payload.function === 'subtract') {
              state.cartItems[itemIndex].quantity -= 1
            }
              // if (itemIndex !== -1) {
              //   if (action.payload.function === "add") {
              //     state.cartItems[itemIndex].quantity += 1;
              //   } else if (action.payload.function === "subtract") { // Use 'subtract' for clarity
              //     state.cartItems[itemIndex].quantity -= 1;
              //     if (state.cartItems[itemIndex].quantity <= 0) {
              //       state.cartItems.splice(itemIndex, 1); // Remove if quantity reaches 0
              //     }
              //   }
              // }
        }
    }
})

export const { addCart, removeCart, updateCart } = cartSlice.actions

export default cartSlice.reducer