import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts:[],
    errormsg:""
}

const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        addPosts:(state,action) => {
           // console.log(action.payload);
              state.posts = action.payload;
              state.errormsg = "error in postSlice"

        }
    }
})

export const {addPosts} = postSlice.actions;
export default postSlice.reducer;