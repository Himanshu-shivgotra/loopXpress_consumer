import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../src/common/axiosInstance';

// Thunk to add item to the cart in the database
export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async (product, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/api/consumers/cart', {
                productId: product._id,
                quantity: 1
            });
            return response.data;
        } catch (err) {
            console.error("Could not add item to the cart:", err);
            return rejectWithValue(err.response.data);
        }
    }
);

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
            saveState(state);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            saveState(state);
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item && action.payload.cartQuantity > 0) {
                item.cartQuantity = action.payload.cartQuantity;
            }
            saveState(state);
        },
        clearCart: (state) => {
            state.items = [];
            saveState(state);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addItemToCart.fulfilled, (state, action) => {
                console.log('Item added to cart in the database:', action.payload);
            })
            .addCase(addItemToCart.rejected, (state, action) => {
                console.error('Failed to add item to cart in the database:', action.payload);
            });
    }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
