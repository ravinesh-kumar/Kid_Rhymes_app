import { createSlice } from "@reduxjs/toolkit";

const vdoSlice = createSlice({
    name: "video",
    initialState: [],
    reducers:{
        nextVdo(state, action){},
        prevVdo(state, action){}
    }
})

export default vdoSlice.reducer;