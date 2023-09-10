import { FormElement } from "../components/shared/form-generator";

export interface FormComponent {
  name: FormElement;
  minW?: number;
  minH?: number;
  maxH: number;
  w: number;
  h: number;
}

const FORM_COMPONENTS: FormComponent[] = [
  {
    name: "TextField",
    maxH: 1,
    w: 3,
    h: 1,
  },
  {
    name: "TextArea",
    minW: 2,
    minH: 2,
    maxH: 4,
    w: 3,
    h: 3,
  },
  {
    name: "Select",
    maxH: 1,
    w: 3,
    h: 1,
  },
  {
    name: "Button",
    maxH: 1,
    w: 3,
    h: 1,
  },
];

export { FORM_COMPONENTS };
