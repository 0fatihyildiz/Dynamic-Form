import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FORM_COMPONENTS,
  FORM_COMPONENTS_PROPS,
  FormComponent,
  FormComponentProps,
} from "../../constants";
import { FormElement } from "../../components/shared/form-generator";
interface GeneralState {
  preview: boolean;
  previewFormData: { [k: string]: FormDataEntryValue };
  cols: number;
  layoutProps: { [key: string]: FormComponentProps };
  droppedItem: FormComponent;
  fieldDialog: {
    open: boolean;
    id: string;
    callback: (fieldProps: (typeof FORM_COMPONENTS_PROPS)[FormElement]) => void;
  };
}

const initialState: GeneralState = {
  previewFormData: {},
  preview: false,
  cols: 3,
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
    setPreview: (state, action: PayloadAction<boolean>) => {
      state.preview = action.payload;
    },
    setPreviewFormData: (
      state,
      action: PayloadAction<GeneralState["previewFormData"]>
    ) => {
      state.previewFormData = action.payload;
    },
    setCols: (state, action: PayloadAction<number>) => {
      state.cols = action.payload;
    },
    setDroppedItem: (state, action: PayloadAction<FormComponent>) => {
      state.droppedItem = action.payload;
    },
    setLayoutProps: (
      state,
      action: PayloadAction<GeneralState["layoutProps"]>
    ) => {
      state.layoutProps = { ...state.layoutProps, ...action.payload };
    },
    setFieldDialogOpen: (
      state,
      action: PayloadAction<GeneralState["fieldDialog"]>
    ) => {
      state.fieldDialog = { ...state.fieldDialog, ...action.payload };
    },
  },
});

export const {
  setDroppedItem,
  setCols,
  setFieldDialogOpen,
  setLayoutProps,
  setPreview,
  setPreviewFormData,
} = generalSlice.actions;
export default generalSlice.reducer;
