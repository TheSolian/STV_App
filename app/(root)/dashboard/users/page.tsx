import { getUsers } from '@/actions/dashboard/get-users'
import { UserTable } from '@/components/dashboard/user-table'
import { userTableColumns } from '@/components/dashboard/user-table-columns'

type Props = {}

const Page: React.FC<Props> = async ({}) => {
  const users = await getUsers()

  return (
    <div className="h-full p-4">
      <div>
        <UserTable columns={userTableColumns} data={users} />
      </div>
    </div>
  )
}

export default Page
