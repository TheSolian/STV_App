import { getUsers } from '@/actions/admin/get-users'
import { UserTable } from '@/components/admin/user-table'
import { userTableColumns } from '@/components/admin/user-table-columns'

type Props = {}

const Page: React.FC<Props> = async ({}) => {
  const users = await getUsers()

  return (
    <div className="h-full px-4">
      <div>
        <UserTable columns={userTableColumns} data={users} />
      </div>
    </div>
  )
}

export default Page
