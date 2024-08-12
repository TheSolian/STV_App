import { getExercises } from '@/actions/dashboard/get-exercises'
import { ExerciseTable } from '@/components/dashboard/exercise-table'
import { exerciseTableColumns } from '@/components/dashboard/exercise-table-columns'

type Props = {}

const Page: React.FC<Props> = async ({}) => {
  const exercises = await getExercises()

  return (
    <div className="h-full p-4">
      <div>
        <ExerciseTable columns={exerciseTableColumns} data={exercises} />
      </div>
    </div>
  )
}

export default Page
