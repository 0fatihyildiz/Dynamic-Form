import { TextField } from "@radix-ui/themes";

function FormTextField() {
  return (
    <TextField.Root>
      <TextField.Input placeholder="Search the docs…" />
    </TextField.Root>
  );
}

export default FormTextField;
