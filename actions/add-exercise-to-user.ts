'use server'

import { db } from '@/prisma'

export type AddExerciseToUserArgs = {
  exerciseId: string
  userId: string
}

export const addExerciseToUserList = async ({
  exerciseId,
  userId,
}: AddExerciseToUserArgs) => {
  const existingExerciseUser = await db.exerciseUser.findFirst({
    where: {
      AND: {
        exerciseId,
        userId,
      },
    },
  })

  if (existingExerciseUser) return

  await db.exerciseUser.create({
    data: {
      exerciseId,
      userId,
    },
  })
}
