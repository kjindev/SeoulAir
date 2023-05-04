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

interface AddressType {
  NAME: string;
  ADDRESS: string;
  LAT: number;
  LNG: number;
}

interface StateType {
  todayState: DataType[];
  yesterdayState: DataType[];
  totalState: DataType[];
  addressState: AddressType;
}

const initialState: StateType = {
  todayState: [],
  yesterdayState: [],
  totalState: [],
  addressState: {
    NAME: "중구",
    ADDRESS: "서울 중구 덕수궁길 15 시청서소문별관 3동",
    LAT: 37.5643408,
    LNG: 126.9756125,
  },
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
    address: (state: StateType, action: PayloadAction<AddressType>) => {
      state.addressState = action.payload;
    },
  },
});

export default dataSlice;
export const { todayData, yesterdayData, totalData, address } =
  dataSlice.actions;
