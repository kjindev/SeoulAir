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
    code1: (state: StateType, action: PayloadAction<number>) => {
      state.code1State = action.payload;
    },
    code2: (state: StateType, action: PayloadAction<number>) => {
      state.code2State = action.payload;
    },
    code3: (state: StateType, action: PayloadAction<number>) => {
      state.code3State = action.payload;
    },
    code4: (state: StateType, action: PayloadAction<number>) => {
      state.code4State = action.payload;
    },
  },
});

export default countSlice;
export const { code1, code2, code3, code4 } = countSlice.actions;
