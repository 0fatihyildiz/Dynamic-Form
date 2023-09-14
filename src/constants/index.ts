import {
  textAreaPropDefs,
  textFieldPropDefs,
  selectTriggerPropDefs,
  buttonPropDefs,
} from "@radix-ui/themes";
import { FormElement } from "../components/shared/form-generator";

export type FormCompPropVariant = typeof textFieldPropDefs.variant.values |  typeof textAreaPropDefs.variant.values | typeof selectTriggerPropDefs.variant.values | typeof buttonPropDefs.variant.values
export type ArrayToUnion<T extends ReadonlyArray<string>> = T[number];

export interface FormComponent {
  name: FormElement;
  minW?: number;
  minH?: number;
  maxH: number;
  h: number;
}

export interface FormComponentProps {
  label: string;
  placeholder: string;
  variant?: {
    current: string;
    values: string[];
  };
  color?: {
    current: string;
    values: string[];
  };
  radius?: {
    current: string;
    values: string[];
  };
}

const FORM_COMPONENTS: FormComponent[] = [
  {
    name: "TextField",
    maxH: 1,
    h: 1,
  },
  {
    name: "TextArea",
    minW: 2,
    minH: 2,
    maxH: 4,
    h: 3,
  },
  {
    name: "Select",
    maxH: 1,
    h: 1,
  },
  {
    name: "Button",
    maxH: 1,
    h: 1,
  },
];


const FORM_COMPONENTS_PROPS = {
  TextField: {
    label: "",
    placeholder: "TextField",
    variant: {
      current: textFieldPropDefs.variant.values[1],
      values: textFieldPropDefs.variant.values,
    },
    color: {
      current: textFieldPropDefs.color.values[25],
      values: textFieldPropDefs.color.values,
    },
    radius: {
      current: textFieldPropDefs.radius.values[2],
      values: textFieldPropDefs.radius.values,
    },
  },
  TextArea: {
    label: "",
    placeholder: "TextArea",
    variant: {
      current: textAreaPropDefs.variant.values[1],
      values: textAreaPropDefs.variant.values,
    },
    color: {
      current: textAreaPropDefs.color.values[25],
      values: textAreaPropDefs.color.values,
    },
  },
  Select: {
    label: "",
    placeholder: "Select",
    variant: {
      current: selectTriggerPropDefs.variant.values[1],
      values: selectTriggerPropDefs.variant.values,
    },
    color: {
      current: selectTriggerPropDefs.color.values[25],
      values: selectTriggerPropDefs.color.values,
    },
    radius: {
      current: selectTriggerPropDefs.radius.values[2],
      values: selectTriggerPropDefs.radius.values,
    },
  },
  Button: {
    label: "Button",
    variant: {
      current: buttonPropDefs.variant.values[1],
      values: buttonPropDefs.variant.values,
    },
    color: {
      current: buttonPropDefs.color.values[10],
      values: buttonPropDefs.color.values,
    },
    radius: {
      current: buttonPropDefs.radius.values[2],
      values: buttonPropDefs.radius.values,
    },
  },
};

export { FORM_COMPONENTS, FORM_COMPONENTS_PROPS };
