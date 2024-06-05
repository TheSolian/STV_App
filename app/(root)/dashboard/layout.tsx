import { Sidebar } from '@/components/dashboard/sidebar'

type Props = {
  children: React.ReactNode
}

const Page: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid h-[calc(100%-var(--navbar-height))] grid-cols-1 grid-rows-[150px,1fr] md:grid-cols-[225px,1fr] md:grid-rows-1">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}

export default Page
