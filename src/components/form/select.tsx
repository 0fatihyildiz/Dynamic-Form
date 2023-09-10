import { Select } from "@radix-ui/themes";

function FormSelect() {
  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger className="w-full" />
      <Select.Content position="popper">
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="orange">Orange</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}

export default FormSelect;