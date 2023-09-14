import FormTextField from "../form/text-field";
import FormTextArea from "../form/text-area";
import FormSelect from "../form/select";
import FormButton from "../form/button";
import React from "react";
import { FormComponentProps } from "../../constants";

export type FormElement = keyof typeof Elements;
interface FormProps {
  name: FormElement;
  props?: FormComponentProps;
  preview: boolean;
}

const Elements = {
  TextField: <FormTextField />,
  TextArea: <FormTextArea />,
  Select: <FormSelect />,
  Button: <FormButton />,
};

function FormGenerator({ name, props, preview }: FormProps) {
  return (
    <div
      className={`${
        !preview && "pointer-events-none select-none"
      } w-full h-full`}
    >
      {React.cloneElement(Elements[name], props)}
    </div>
  );
}

export default FormGenerator;
