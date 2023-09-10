import FormTextField from "../form/text-field";
import FormTextArea from "../form/text-area";
import FormSelect from "../form/select";
import FormButton from "../form/button";

export type FormElement = keyof typeof Elements;
interface FormProps {
  name: FormElement;
  props?: never;
}

const Elements = {
  TextField: <FormTextField />,
  TextArea: <FormTextArea />,
  Select: <FormSelect />,
  Button: <FormButton />
};

function FormGenerator(props: FormProps) {
  return (
    <div className="pointer-events-none select-none w-full h-full">
      {Elements[props.name]}
    </div>
  );
}

export default FormGenerator;
