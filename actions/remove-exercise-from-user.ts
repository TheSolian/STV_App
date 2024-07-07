'use server'

import { db } from '@/prisma'

export type RemoveExerciseFromUserArgs = {
  exerciseId: string
  userId: string
}

export const removeExerciseFromUserList = async ({
  exerciseId,
  userId,
}: RemoveExerciseFromUserArgs) => {
  const existingExerciseUser = await db.exerciseUser.findFirst({
    where: {
      AND: {
        exerciseId,
        userId,
      },
    },
  })

  if (existingExerciseUser) {
    await db.exerciseUser.delete({
      where: {
        id: existingExerciseUser.id,
      },
    })
  }
}
