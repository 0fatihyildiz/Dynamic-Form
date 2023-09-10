interface FormComponent {
  name: "TextField" | "TextArea" | "Select";
  minW: number;
  maxH: number;
  w: number;
  h: number;
}

const FORM_COMPONENTS: FormComponent[] = [
  {
    name: "TextField",
    minW: 1,
    maxH: 1,
    w: 6,
    h: 1,
  },
  {
    name: "TextArea",
    minW: 2,
    maxH: 4,
    w: 6,
    h: 3,
  },
  {
    name: "Select",
    minW: 1,
    maxH: 1,
    w: 6,
    h: 1,
  },
];

export { FORM_COMPONENTS };
