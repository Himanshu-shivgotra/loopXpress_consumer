import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../src/common/axiosInstance';

// Thunk to fetch items from the cart in the database
export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/api/consumers/cart');
            return response.data;
        } catch (err) {
            console.error("Could not fetch cart items:", err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async (product, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/api/consumers/cart', {
                productId: product._id,
                title: product.title,
                imageUrl: product.imageUrls[0],
                brand: product.brand,
                category: product.category,
                subcategory: product.subcategory,
                price: product.discountedPrice,
                quantity: 1
            });
            return response.data;
        } catch (err) {
            console.error("Could not add item to the cart:", err);
            return rejectWithValue(err.response.data);
        }
    }
);


const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [] },
    reducers: {

    }
});

export const { } = cartSlice.actions;
export default cartSlice.reducer;
