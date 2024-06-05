type Props = {
  children: React.ReactNode
}

const Page: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-full px-8 sm:px-0 bg-[#9D9182]">
      {children}
    </div>
  )
}

export default Page
