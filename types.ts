import { getUsers } from './actions/admin/get-users'

export type User = Awaited<ReturnType<typeof getUsers>>[number]
