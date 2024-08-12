import { db } from '@/prisma'

export const getExerciseById = async (id: string) => {
  try {
    const exercise = await db.exercise.findUnique({ where: { id } })
    return exercise
  } catch {
    return null
  }
}
