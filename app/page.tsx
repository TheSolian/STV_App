import { redirect } from 'next/navigation'

type Props = {}

const Page: React.FC<Props> = async ({}) => {
  return redirect('/my-exercises')
}

export default Page
