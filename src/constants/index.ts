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
    placeholder: "",
    variant: {
      current: "",
      values: textFieldPropDefs.variant.values,
    },
    color: {
      current: "",
      values: textFieldPropDefs.color.values,
    },
    radius: {
      current: "",
      values: textFieldPropDefs.radius.values,
    },
  },
  TextArea: {
    label: "",
    placeholder: "",
    variant: {
      current: "",
      values: textAreaPropDefs.variant.values,
    },
    color: {
      current: "",
      values: textAreaPropDefs.color.values,
    },
  },
  Select: {
    label: "",
    placeholder: "",
    variant: {
      current: "",
      values: selectTriggerPropDefs.variant.values,
    },
    color: {
      current: "",
      values: selectTriggerPropDefs.color.values,
    },
    radius: {
      current: "",
      values: selectTriggerPropDefs.radius.values,
    },
  },
  Button: {
    label: "",
    variant: {
      current: "",
      values: buttonPropDefs.variant.values,
    },
    color: {
      current: "",
      values: buttonPropDefs.color.values,
    },
    radius: {
      current: "",
      values: buttonPropDefs.radius.values,
    },
  },
};

export { FORM_COMPONENTS, FORM_COMPONENTS_PROPS };
