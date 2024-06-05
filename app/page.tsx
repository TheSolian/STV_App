import { auth } from '@/auth'
import LogoutButton from '@/components/auth/logout-button'

type Props = {}

const Page: React.FC<Props> = async ({}) => {
  const session = await auth()

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <LogoutButton>Logout</LogoutButton>
    </div>
  )
}

export default Page
