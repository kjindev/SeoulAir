import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import nameSlice from "./nameSlice";
import countSlice from "./countSlice";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    name: nameSlice.reducer,
    count: countSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
