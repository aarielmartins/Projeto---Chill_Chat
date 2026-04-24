type MainProps = {
  className?: string
  children?: React.ReactNode
}

const Main = ({ className, children }: MainProps) => {
  return <div className={`w-full ${className ?? ''}`}>{children}</div>
}

export default Main
