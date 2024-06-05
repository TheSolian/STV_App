'use server'

import { db } from '@/prisma'

export const getExercises = async () => {
  const exercises = await db.exercise.findMany({
    include: {
      category: true,
      type: true,
    },
  })

  return exercises
}
