import { Button } from "@radix-ui/themes";

interface Props {
  text?: string;
}

function FormButton({ text = "Button" }: Props) {
  return <Button className="w-full h-full">{text}</Button>;
}

export default FormButton;
