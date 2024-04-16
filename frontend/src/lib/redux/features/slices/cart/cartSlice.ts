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
                brand: action.payload.brand
            }
            state.cartItems.push(item);
        },
        removeCart: (state, action) => {
            state.cartItems.filter(item => item.id !== action.payload.id)
        }
    }
})

export const { addCart, removeCart } = cartSlice.actions

export default cartSlice.reducer