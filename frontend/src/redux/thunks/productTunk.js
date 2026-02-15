import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axios";

export const productsFetch = createAsyncThunk(
  "products/fetchproducts",
  async ({ category, searchQuery, skip, limit }) => {
    console.log(category);
    let data;
    if (category == "trending") {
      data = await axiosInstance.get(
        `/products/?trending=true&name=${searchQuery}&skip=${skip}&limit=${limit}`,
      );
    } else {
      data = await axiosInstance.get(
        `/products/?category=${category}&name=${searchQuery}&skip=${skip}&limit=${limit}`,
      );
    }
    return data.data;
  },
);
