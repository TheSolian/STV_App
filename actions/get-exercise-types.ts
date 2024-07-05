'use server'

import { db } from '@/prisma'

export const getExerciseTypes = async () => {
  const elementTypes = await db.exerciseType.findMany()
  return elementTypes
}
