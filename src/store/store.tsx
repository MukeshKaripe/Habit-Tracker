import { configureStore } from "@reduxjs/toolkit";
import reduxData from "../redux/reduxSlice"

const store = configureStore({
    reducer: {
        habbit: reduxData
    }
})

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

