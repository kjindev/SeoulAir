import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  nameState: string | undefined;
  dailyState: boolean;
  totalState: boolean;
  locationState: boolean;
  todayDateState: string;
  yesterdayDateState: string;
}

const initialState: StateType = {
  nameState: "중구",
  dailyState: true,
  totalState: false,
  locationState: false,
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
    daily: (state: StateType, action: PayloadAction<boolean>) => {
      state.dailyState = action.payload;
    },
    total: (state: StateType, action: PayloadAction<boolean>) => {
      state.totalState = action.payload;
    },
    location: (state: StateType, action: PayloadAction<boolean>) => {
      state.locationState = action.payload;
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
export const { name, daily, total, location, todayDate, yesterdayDate } =
  nameSlice.actions;
