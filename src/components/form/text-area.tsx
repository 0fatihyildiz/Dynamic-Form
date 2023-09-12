import { TextArea } from '@radix-ui/themes'
import { ArrayToUnion, FORM_COMPONENTS_PROPS } from '../../constants';

const ConstantsTextField = FORM_COMPONENTS_PROPS["TextArea"];
interface Props {
  placeholder?: string
  variant?: ArrayToUnion<(typeof ConstantsTextField)["variant"]["values"]>;
  color?: ArrayToUnion<(typeof ConstantsTextField)["color"]["values"]>;
}

function FormTextArea(props: Props) {
  return (
    <TextArea className='h-full w-full' {...props} />
  )
}

export default FormTextArea