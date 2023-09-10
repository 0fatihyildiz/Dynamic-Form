import { TextArea } from '@radix-ui/themes'
interface Props {
  placeholder?: string
}

function FormTextArea({ placeholder = "Textarea" }: Props) {
  return (
    <TextArea className='h-full w-full' placeholder={placeholder} />
  )
}

export default FormTextArea