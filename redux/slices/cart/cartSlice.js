import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload._id);
            if (existingItem) {
                existingItem.cartQuantity += 1; // Update quantity if the product already exists
            } else {
                state.items.push({ ...action.payload, id: action.payload._id, cartQuantity: 1 }); // Add new product
            }
        },

        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item && action.payload.cartQuantity > 0) {
                item.cartQuantity = action.payload.cartQuantity;
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
