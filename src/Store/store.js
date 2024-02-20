import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";
import themeSlice from "./themeSlice";



const store  = configureStore({
    reducer:{
        auth : authSlice,
        posts : postSlice,
        theme : themeSlice,
    }
})





export default store;