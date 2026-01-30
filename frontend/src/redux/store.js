import { configureStore } from '@reduxjs/toolkit'
import products from "./productSlice"
import cart from './cartSlice'
import isLoggedIn from "./authSlice"

export const store = configureStore({
    reducer:{
        isLoggedIn:isLoggedIn,
        products: products,
        cart: cart
    }
})


