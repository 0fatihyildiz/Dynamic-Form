import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FORM_COMPONENTS,
  FormComponent,
  FormComponentProps,
} from "../../constants";
import { Layout } from "react-grid-layout";
interface GeneralState {
  cols: number;
  layout: Layout[];
  layoutProps: { [key: string]: FormComponentProps };
  droppedItem: FormComponent;
  fieldDialog: {
    open: boolean;
    id: string;
    callback: () => void;
  };
}

const initialState: GeneralState = {
  cols: 3,
  layout: [],
  layoutProps: {},
  droppedItem: FORM_COMPONENTS[0],
  fieldDialog: {
    open: false,
    id: "",
    callback: () => {},
  },
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setCols: (state, action: PayloadAction<number>) => {
      state.cols = action.payload;
    },
    setLayout: (state, action: PayloadAction<Layout[]>) => {
      state.layout = action.payload;
    },
    setDroppedItem: (state, action: PayloadAction<FormComponent>) => {
      state.droppedItem = action.payload;
    },
    setFieldDialogOpen: (
      state,
      action: PayloadAction<GeneralState["fieldDialog"]>) => {
      state.fieldDialog = action.payload;
    },
  }
});

export const { setDroppedItem, setLayout, setCols, setFieldDialogOpen } =
  generalSlice.actions;
export default generalSlice.reducer;
