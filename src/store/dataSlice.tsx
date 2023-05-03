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
    todayData: (state: StateType, action: PayloadAction<DataType[]>) => {
      state.todayState = action.payload;
    },
    yesterdayData: (state: StateType, action: PayloadAction<DataType[]>) => {
      state.yesterdayState = action.payload;
    },
    totalData: (state: StateType, action: PayloadAction<DataType[]>) => {
      state.totalState = action.payload;
    },
  },
});

export default dataSlice;
export const { todayData, yesterdayData, totalData } = dataSlice.actions;
