import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  code1State: number;
  code2State: number;
  code3State: number;
  code4State: number;
}

const initialState: StateType = {
  code1State: 0,
  code2State: 0,
  code3State: 0,
  code4State: 0,
};

const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    code1Update: (state: StateType, action: PayloadAction<number>) => {
      state.code1State = action.payload;
    },
    code2Update: (state: StateType, action: PayloadAction<number>) => {
      state.code2State = action.payload;
    },
    code3Update: (state: StateType, action: PayloadAction<number>) => {
      state.code3State = action.payload;
    },
    code4Update: (state: StateType, action: PayloadAction<number>) => {
      state.code4State = action.payload;
    },
  },
});

export default countSlice;
export const { code1Update, code2Update, code3Update, code4Update } =
  countSlice.actions;
