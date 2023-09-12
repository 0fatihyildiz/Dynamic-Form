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
}

const Elements = {
  TextField: <FormTextField />,
  TextArea: <FormTextArea />,
  Select: <FormSelect />,
  Button: <FormButton />,
};

function FormGenerator({ name, props }: FormProps) {
  console.log(name, props, 'FormGenerator');
  
  return (
    <div className="pointer-events-none select-none w-full h-full">
      {React.cloneElement(Elements[name], props)}
    </div>
  );
}

export default FormGenerator;
