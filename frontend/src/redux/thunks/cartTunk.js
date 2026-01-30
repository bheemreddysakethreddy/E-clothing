import { createAsyncThunk } from "@reduxjs/toolkit";

export const cartProducts = createAsyncThunk(
  "fetching/cartProducts",
  async (url, { rejectWithValue }) => {
    const response = await fetch(url);
    const result = await response.json();

    if (!result.status) {
      return rejectWithValue(result.message);
    }

    return result.data;
  },
);
