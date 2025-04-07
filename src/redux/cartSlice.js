import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],      // Local cart state (optional if syncing from backend)
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    updateCartQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },

    // Optional: load cart from backend
    setCart: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  setCart
} = cartSlice.actions;

export default cartSlice.reducer;
