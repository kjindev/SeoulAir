import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  nameState: string;
  todayState: [];
  yesterdayState: [];
}

const initialState: StateType = {
  nameState: "",
  todayState: [],
  yesterdayState: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    nameUpdate: (state, action) => {
      state.nameState = action.payload;
    },
    todayUpdate: (state, action) => {
      state.todayState = action.payload;
    },
    yesterdayUpdate: (state, action) => {
      state.yesterdayState = action.payload;
    },
  },
});

export default dataSlice;
export const { nameUpdate, todayUpdate, yesterdayUpdate } = dataSlice.actions;
