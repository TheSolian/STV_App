import { TBD } from '@/components/to-be-done'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UserExerciseList } from '@/components/user-exercise-list'
import { getUserById } from '@/data/user'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: {
    id: string
  }
}

const Page: React.FC<Props> = async ({ params }) => {
  const user = await getUserById(params.id)

  return (
    <div className="grid grid-cols-1 grid-rows-[50px,1fr] lg:grid-cols-[275px,1fr] lg:grid-rows-1">
      <div className="h-[calc(100vh-var(--navbar-height))] border-r p-4">
        <div className="flex h-5 items-center gap-4 text-center">
          <Link
            href="/dashboard/users"
            className={buttonVariants({
              className: 'flex items-center gap-2',
              variant: 'link',
            })}
          >
            <ArrowLeftIcon className="size-4" />
            <span>Zurück</span>
          </Link>
          <Separator orientation="vertical" />
          <h1 className="font-bold">{user?.name}</h1>
        </div>
        <Separator className="my-4" />
        Filter <TBD />
      </div>
      <div className="p-4">
        <UserExerciseList
          userId={params.id}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
        />
      </div>
    </div>
  )
}

export default Page
