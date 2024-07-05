import { getExercises } from '@/actions/get-exercises'
import { ExerciseList } from '@/components/exercise-list'

type Props = {}

const Page: React.FC<Props> = async ({}) => {
  return (
    <div className="p-4">
      <ExerciseList />
    </div>
  )
}

export default Page
