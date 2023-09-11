import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FORM_COMPONENTS, FormComponent } from "../../constants";
import { Layout } from "react-grid-layout";
interface GeneralState {
  cols: number
  layout: Layout[]
  droppedItem: FormComponent;
}

const initialState: GeneralState = {
  cols: 3,
  layout: [],
  droppedItem: FORM_COMPONENTS[0],
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setCols: (state, action: PayloadAction<Layout[]>) => {
      state.layout = action.payload;
    },
    setLayout: (state, action: PayloadAction<Layout[]>) => {
      state.layout = action.payload;
    },
    setDroppedItem: (state, action: PayloadAction<FormComponent>) => {
      state.droppedItem = action.payload;
    },
  },
});

export const { setDroppedItem, setLayout } = generalSlice.actions;
export default generalSlice.reducer;
