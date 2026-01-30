import { createSlice } from "@reduxjs/toolkit";
import { cartProducts } from "./thunks/cartTunk";

const localCart = JSON.parse(localStorage.getItem("cartlocal")) ?? [];

export const cartSlice = createSlice({
  name: "cartItems",
  initialState: {
    
    cartData: {
      loading: false,
      error: false,
      data: localCart,
    },
  },
  reducers: {
    addtoCart: (state, action) => {
      const { id, title, description, quantity, price, image } = action.payload;

      const existing = state.cartData.data.find(
        (obj) => obj.product._id === id,
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.cartData.data.push({
          product: {
            _id: id,
            name: title,
            description,
            image,
            price,
          },
          quantity,
        });
      }

      localStorage.setItem("cartlocal", JSON.stringify(state.cartData.data));

      console.log(JSON.parse(localStorage.getItem("cartlocal")));
    },

    increaseQuantity: (state, action) => {
      const item = state.cartData.data.find(
        (obj) => obj.product._id === action.payload.id,
      );
      if (item) item.quantity++;
      localStorage.setItem("cartlocal", JSON.stringify(state.cartData.data));
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartData.data.find(
        (obj) => obj.product._id === action.payload.id,
      );
      if (item && item.quantity > 1) item.quantity--;
      localStorage.setItem("cartlocal", JSON.stringify(state.cartData.data));
    },

    deletetoCart: (state, action) => {
      state.cartData.data = state.cartData.data.filter(
        (obj) => obj.product._id !== action.payload.id,
      );

      localStorage.setItem("cartlocal", JSON.stringify(state.cartData.data));
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(cartProducts.pending, (state) => {
        state.cartData.loading = true;
      })
      .addCase(cartProducts.rejected, (state, action) => {
        state.cartData.error = action.error;
        state.cartData.loading = false;
      })
      .addCase(cartProducts.fulfilled, (state, { payload }) => {
        state.cartData.data = payload;
        state.cartData.loading = false;
        state.cartData.error = false;
      });
  },
});

export const { addtoCart, increaseQuantity, decreaseQuantity, deletetoCart } =
  cartSlice.actions;

export default cartSlice.reducer;
