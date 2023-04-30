import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  nameState: string | undefined;
  menuState: boolean;
}

const initialState: StateType = {
  nameState: "중구",
  menuState: true,
};

const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    nameUpdate: (state: StateType, action: PayloadAction<string>) => {
      state.nameState = action.payload;
    },
    menuUpdate: (state: StateType, action: PayloadAction<boolean>) => {
      state.menuState = action.payload;
    },
  },
});

export default nameSlice;
export const { nameUpdate, menuUpdate } = nameSlice.actions;
