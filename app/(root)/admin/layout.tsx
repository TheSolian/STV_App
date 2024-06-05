import { Sidebar } from '@/components/admin/sidebar'

type Props = {
  children: React.ReactNode
}

const Page: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid grid-rows-[150px,1fr] grid-cols-1 md:grid-rows-1 md:grid-cols-[225px,1fr] h-[calc(100%-var(--navbar-height))]">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}

export default Page
