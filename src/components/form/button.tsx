import { Button } from "@radix-ui/themes";
import { ArrayToUnion, FORM_COMPONENTS_PROPS } from "../../constants";

const ConstantsButton = FORM_COMPONENTS_PROPS["Button"];
interface Props {
  label?: string;
  variant?: ArrayToUnion<(typeof ConstantsButton)["variant"]["values"]>;
  color?: ArrayToUnion<(typeof ConstantsButton)["color"]["values"]>;
  radius?: ArrayToUnion<(typeof ConstantsButton)["radius"]["values"]>;
}

function FormButton(props: Props) {
  return (
    <Button className="w-full h-full" {...props}>
      {props.label}
    </Button>
  );
}

export default FormButton;
