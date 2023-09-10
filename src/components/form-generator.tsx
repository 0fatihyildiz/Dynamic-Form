import FormTextField from "../components/form/text-field";
import FormTextArea from "../components/form/text-area";
import FormSelect from "../components/form/select";

export interface FormProps {
  name: "TextField" | "TextArea" | "Select";
  props?: never;
}

function FormGenerator(props: FormProps) {
  const Elements = {
    TextField: <FormTextField />,
    TextArea: <FormTextArea />,
    Select: <FormSelect />,
  };

  return <div className="pointer-events-none">{Elements[props.name]}</div>;
}

export default FormGenerator;
