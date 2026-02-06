import { createAsyncThunk } from "@reduxjs/toolkit";

export const cartProducts = createAsyncThunk(
  "fetching/cartProducts",
  async (url, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!result.status) {
      return rejectWithValue(result.message);
    }

    return result.data;
  }
);

