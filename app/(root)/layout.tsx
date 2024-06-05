import { Navbar } from '@/components/navbar'

type Props = {
  children: React.ReactNode
}

const Page: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  )
}

export default Page
