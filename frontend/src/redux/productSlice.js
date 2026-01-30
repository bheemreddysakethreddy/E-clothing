import { createSlice } from "@reduxjs/toolkit";
import { productsFetch } from "./thunks/productTunk";
export const productSlice = createSlice({
  name: "product",
  initialState: {
    fetchedData: {
      loading: true,
      data: null,
      error: null,
    },
  },

  extraReducers: (builder) => {
    builder.addCase(productsFetch.pending, (state) => {
      state.fetchedData.loading = true;
    });
    builder.addCase(productsFetch.fulfilled, (state, { payload }) => {
      state.fetchedData.loading = false;
      state.fetchedData.data = payload;
    });
    builder.addCase(productsFetch.rejected, (state, action) => {
      state.fetchedData.error = action.error;
      state.fetchedData.loading = false;
    });
  },
});
export const {} = productSlice.actions;
export default productSlice.reducer;
