import { createAsyncThunk } from "@reduxjs/toolkit";
export const productsFetch = createAsyncThunk(
  "products/fetchproducts",
  async (url) => {
    console.log(url);
    let res = await fetch(url);
    let data = await res.json();
    return data;
  },
);
