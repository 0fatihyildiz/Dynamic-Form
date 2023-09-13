import { Select } from "@radix-ui/themes";
import { ArrayToUnion, FORM_COMPONENTS_PROPS } from "../../constants";

const ConstantsTextField = FORM_COMPONENTS_PROPS["Select"];
interface Props {
  placeholder?: string
  variant?: ArrayToUnion<(typeof ConstantsTextField)["variant"]["values"]>;
  color?: ArrayToUnion<(typeof ConstantsTextField)["color"]["values"]>;
  radius?: ArrayToUnion<(typeof ConstantsTextField)["radius"]["values"]>;
}

function FormSelect(props: Props) {
  return (
    <Select.Root>
      <Select.Trigger className="w-full h-full" {...props} />
      <Select.Content position="popper">
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="orange">Orange</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}

export default FormSelect;