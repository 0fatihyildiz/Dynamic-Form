import { Button } from "@radix-ui/themes";
import { ArrayToUnion, FORM_COMPONENTS_PROPS } from "../../constants";

const ConstantsButton = FORM_COMPONENTS_PROPS["Button"];
interface Props {
  text?: string;
  variant: ArrayToUnion<(typeof ConstantsButton)["variant"]["values"]>;
  color: ArrayToUnion<(typeof ConstantsButton)["color"]["values"]>;
  radius: ArrayToUnion<(typeof ConstantsButton)["radius"]["values"]>;
}

function FormButton(props: Props) {
  const { text = "Button" } = props;

  return (
    <Button className="w-full h-full" {...props}>
      {text}
    </Button>
  );
}

export default FormButton;
