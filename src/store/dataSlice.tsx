import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataType {
  CO: number;
  MSRDT: string;
  MSRSTE_NM: string;
  NO2: number;
  O3: number;
  PM10: number;
  PM25: number;
  SO2: number;
}

interface StateType {
  todayState: DataType[];
  yesterdayState: DataType[];
  totalState: DataType[];
}

const initialState: StateType = {
  todayState: [],
  yesterdayState: [],
  totalState: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    todayUpdate: (state: StateType, action: PayloadAction<DataType[]>) => {
      state.todayState = action.payload;
    },
    yesterdayUpdate: (state: StateType, action: PayloadAction<DataType[]>) => {
      state.yesterdayState = action.payload;
    },
    totalUpdate: (state: StateType, action: PayloadAction<DataType[]>) => {
      state.totalState = action.payload;
    },
  },
});

export default dataSlice;
export const { todayUpdate, yesterdayUpdate, totalUpdate } = dataSlice.actions;
