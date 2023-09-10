import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FORM_COMPONENTS, FormComponent } from "../../constants";

interface GeneralState {
  droppedItem: FormComponent;
}

const initialState: GeneralState = {
  droppedItem: FORM_COMPONENTS[0],
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setDroppedItem: (state, action: PayloadAction<FormComponent>) => {
      state.droppedItem = action.payload;
    },
  },
});

export const { setDroppedItem } = generalSlice.actions;
export default generalSlice.reducer;
