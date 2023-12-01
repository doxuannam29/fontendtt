import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slider/counterSlide'
import useReducer from './slider/UserSlide'
import productReducer from './slider/productSlide '
export const store = configureStore({
    reducer: {
        // counter: counterReducer
        product: productReducer,
        user: useReducer
    },
})