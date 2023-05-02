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
    nameUpdate: (
      state: StateType,
      action: PayloadAction<string | undefined>
    ) => {
      state.nameState = action.payload;
    },
    menuUpdate: (state: StateType, action: PayloadAction<boolean>) => {
      state.menuState = action.payload;
    },
    todayDateUpdate: (state: StateType, action: PayloadAction<string>) => {
      state.todayDateState = action.payload;
    },
    yesterdayDateUpdate: (state: StateType, action: PayloadAction<string>) => {
      state.yesterdayDateState = action.payload;
    },
  },
});

export default nameSlice;
export const { nameUpdate, menuUpdate, todayDateUpdate, yesterdayDateUpdate } =
  nameSlice.actions;
