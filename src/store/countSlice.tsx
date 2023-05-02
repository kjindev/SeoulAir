import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  code1State: number;
  code2State: number;
  code3State: number;
  code4State: number;
  sumState: number;
}

const initialState: StateType = {
  code1State: 0,
  code2State: 0,
  code3State: 0,
  code4State: 0,
  sumState: 0,
};

const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    code1Update: (state: StateType) => {
      state.code1State = state.code1State + 1;
    },
    code2Update: (state: StateType) => {
      state.code2State = state.code2State + 1;
    },
    code3Update: (state: StateType) => {
      state.code3State = state.code3State + 1;
    },
    code4Update: (state: StateType) => {
      state.code4State = state.code4State + 1;
    },
    sumUpdate: (state: StateType) => {
      state.sumState = state.sumState + 1;
    },
  },
});

export default countSlice;
export const { code1Update, code2Update, code3Update, code4Update, sumUpdate } =
  countSlice.actions;
