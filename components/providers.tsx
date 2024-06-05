import { Toaster } from './ui/sonner'

type Props = {
  children: React.ReactNode
}

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
