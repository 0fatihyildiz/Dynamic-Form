import { TextField } from "@radix-ui/themes";

interface Props {
  placeholder?: string
}

function FormTextField({ placeholder = "TextField" }: Props) {
  return (
    <TextField.Root className="w-full h-full">
      <TextField.Input placeholder={placeholder} />
    </TextField.Root>
  );
}

export default FormTextField;
