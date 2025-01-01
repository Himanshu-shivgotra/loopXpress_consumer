import { createSlice } from '@reduxjs/toolkit';

// Load state from localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        return serializedState ? JSON.parse(serializedState) : { items: [] };
    } catch (err) {
        console.error("Could not load cart state:", err);
        return { items: [] };
    }
};

// Save state to localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (err) {
        console.error("Could not save cart state:", err);
    }
};

const initialState = loadState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload._id);
            if (existingItem) {
                existingItem.cartQuantity += 1;
            } else {
                state.items.push({ ...action.payload, id: action.payload._id, cartQuantity: 1 });
            }
            saveState(state); // Persist state
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            saveState(state); // Persist state
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item && action.payload.cartQuantity > 0) {
                item.cartQuantity = action.payload.cartQuantity;
            }
            saveState(state); // Persist state
        },
    },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
