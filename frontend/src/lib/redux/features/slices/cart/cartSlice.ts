import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [
        {
            id: 1,
            title: 'hello world',
            itemImg: 'HelpCircleIcon.jpg',
            size: 'S'
        }
    ],
}



export const cartSlice = createSlice({
    name: 'item',
    initialState: initialState,
    reducers: {
        addCart: (state, action) => {
            const item = {
                id: action.payload.id,
                title: action.payload.title,
                itemImg: action.payload.itemImg,
                size: action.payload.size
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