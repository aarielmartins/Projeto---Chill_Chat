import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  name?: string
}

const Botao = ({ name, children, ...props }: Props) => {
  return (
    <button type="button" {...props}>
      {children || name}
    </button>
  )
}

export default Botao
