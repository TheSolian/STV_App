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

export const getExercisesByUserId = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      exercises: {
        include: {
          exercises: {
            include: {
              type: true,
              category: true,
            },
          },
        },
      },
    },
  })

  if (!user) return

  const exercises = user.exercises.map((exercise) => exercise.exercises)

  return exercises
}
