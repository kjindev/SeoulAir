import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  nameState: string | undefined;
  menuState: boolean;
  todayDateState: string;
  yesterdayDateState: string;
}

const initialState: StateType = {
  nameState: "중구",
  menuState: true,
  todayDateState: "",
  yesterdayDateState: "",
};

const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    name: (state: StateType, action: PayloadAction<string | undefined>) => {
      state.nameState = action.payload;
    },
    menu: (state: StateType, action: PayloadAction<boolean>) => {
      state.menuState = action.payload;
    },
    todayDate: (state: StateType, action: PayloadAction<string>) => {
      state.todayDateState = action.payload;
    },
    yesterdayDate: (state: StateType, action: PayloadAction<string>) => {
      state.yesterdayDateState = action.payload;
    },
  },
});

export default nameSlice;
export const { name, menu, todayDate, yesterdayDate } = nameSlice.actions;
