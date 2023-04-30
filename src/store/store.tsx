import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import nameSlice from "./nameSlice";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    name: nameSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
