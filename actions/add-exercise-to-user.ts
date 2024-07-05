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
  await db.exerciseUser.create({
    data: {
      exerciseId,
      userId,
    },
  })
}
