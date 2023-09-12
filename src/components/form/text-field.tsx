import { TextField } from "@radix-ui/themes";
import { ArrayToUnion, FORM_COMPONENTS_PROPS } from "../../constants";

const ConstantsTextField = FORM_COMPONENTS_PROPS["TextField"];
interface Props {
  placeholder: string
  variant: ArrayToUnion<(typeof ConstantsTextField)["variant"]["values"]>;
  color: ArrayToUnion<(typeof ConstantsTextField)["color"]["values"]>;
  radius: ArrayToUnion<(typeof ConstantsTextField)["radius"]["values"]>;
}

function FormTextField(props: Props) {
  return (
    <TextField.Root className="w-full h-full">
      <TextField.Input {...props} />
    </TextField.Root>
  );
}

export default FormTextField;
